export interface VersionChange {
  text: string;
}

export interface ReleaseChanges {
  changes: Record<string, VersionChange[]>;
}

export interface ReleaseInfo {
  changes: ReleaseChanges;
  date: string;
  link: string;
  version: string;
  versionURL: string;
}

export interface ChangeHeaderProps {
  date: string;
  version: string;
  link: string;
  versionURL: string;
}

export interface BuildChangesProps {
  info: ReleaseChanges;
}

export interface ProgramResult {
  changes: Change[];
  date: string;
  link: string;
  version: string;
  versionURL: string;
}

export interface Change {
  type: string;
  text: string;
}
