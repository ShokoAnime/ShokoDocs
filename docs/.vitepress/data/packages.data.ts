import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The package versions the examples pin, looked up on nuget.org while the site builds and written back here, so a
// build without network — or with DOCS_SKIP_VERSION_FETCH set — still has the last known good ones.
const cacheFile = fileURLToPath(new URL('./package-versions.json', import.meta.url));

const packages = {
  abstractions: 'Shoko.Abstractions',
  targets: 'Shoko.BuildTools.Targets',
  analyzers: 'Shoko.BuildTools.Analyzers',
  queueProcessor: 'Shoko.QueueProcessor',
} as const;

export type PackageVersions = Record<keyof typeof packages, string>;

/** Splits a SemVer 2.0 version into its numeric parts and its prerelease identifiers, dropping build metadata. */
function parse(version: string): { release: number[], pre: string[] } {
  const [core, pre = ''] = version.split('+')[0].split('-', 2);
  return {
    release: core.split('.').map(part => Number.parseInt(part, 10) || 0),
    pre: pre.length > 0 ? pre.split('.') : [],
  };
}

/** Compares two versions by SemVer precedence: a release outranks its own prereleases, and `alpha.9` precedes `alpha.10`. */
function compare(a: string, b: string): number {
  const left = parse(a);
  const right = parse(b);
  for (let index = 0; index < Math.max(left.release.length, right.release.length); index++) {
    const difference = (left.release[index] ?? 0) - (right.release[index] ?? 0);
    if (difference !== 0) return difference;
  }

  if (left.pre.length === 0 || right.pre.length === 0) return right.pre.length - left.pre.length;

  for (let index = 0; index < Math.max(left.pre.length, right.pre.length); index++) {
    const one = left.pre[index];
    const other = right.pre[index];
    if (one === undefined || other === undefined) return (one === undefined ? -1 : 1);
    if (one === other) continue;
    const numbers = /^\d+$/.test(one) && /^\d+$/.test(other);
    if (numbers) return Number.parseInt(one, 10) - Number.parseInt(other, 10);
    return one < other ? -1 : 1;
  }

  return 0;
}

/** The newest version of a package, prereleases included, or `null` when nuget.org can't be reached. */
async function fetchLatest(id: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.nuget.org/v3-flatcontainer/${id.toLowerCase()}/index.json`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!response.ok) return null;

    // The feed doesn't promise an order, so pick the highest rather than the last.
    const { versions } = await response.json() as { versions?: string[] };
    return versions?.length ? versions.reduce((highest, version) => (compare(version, highest) > 0 ? version : highest)) : null;
  } catch {
    return null;
  }
}

// A VitePress data loader: `load` runs while the site builds, and its result is what a page importing `data` gets.
export default {
  async load(): Promise<PackageVersions> {
    const cached = JSON.parse(readFileSync(cacheFile, 'utf8')) as PackageVersions;
    if (process.env.DOCS_SKIP_VERSION_FETCH) return cached;

    const entries = await Promise.all(
      Object.entries(packages).map(async ([key, id]) => [key, await fetchLatest(id)] as const),
    );

    const missing = entries.filter(([, version]) => version === null).map(([key]) => packages[key]);
    if (missing.length > 0) {
      console.warn(`[packages] Keeping the cached version of ${missing.join(', ')}: nuget.org did not answer for it.`);
    }

    const resolved = Object.fromEntries(
      entries.map(([key, version]) => [key, version ?? cached[key]]),
    ) as PackageVersions;

    if (JSON.stringify(resolved) !== JSON.stringify(cached)) {
      writeFileSync(cacheFile, `${JSON.stringify(resolved, null, 2)}\n`);
    }

    return resolved;
  },
};
