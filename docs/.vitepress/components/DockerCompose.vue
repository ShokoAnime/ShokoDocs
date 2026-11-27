<template>
  <div class="dc">
    <div class="docker-mode" role="group" aria-label="Builder mode">
      <button type="button" :class="{ active: mode === 'simple' }" :aria-pressed="mode === 'simple'" @click="mode = 'simple'">Simple</button>
      <button type="button" :class="{ active: mode === 'advanced' }" :aria-pressed="mode === 'advanced'" @click="mode = 'advanced'">Advanced</button>
    </div>

    <div class="dc-card">
      <section class="dc-section" v-if="mode === 'advanced'">
        <div class="dc-title">Image</div>
        <div class="dc-row">
          <div class="dc-field">
            <span class="dc-label">Registry</span>
            <div class="dc-seg" role="radiogroup" aria-label="Registry">
              <label v-for="option in registryOptions" :key="option.value" :class="{ active: extras.registry === option.value }">
                <input type="radio" v-model="extras.registry" :value="option.value" />{{ option.label }}
              </label>
            </div>
          </div>
          <div class="dc-field">
            <span class="dc-label">Release channel</span>
            <div class="dc-seg" role="radiogroup" aria-label="Release channel">
              <label v-for="option in channelOptions" :key="option.value" :class="{ active: extras.channel === option.value }">
                <input type="radio" v-model="extras.channel" :value="option.value" />{{ option.label }}
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="dc-section">
        <div class="dc-title">Container</div>
        <div class="dc-grid">
          <label class="dc-field">
            <span class="dc-label">{{ fieldLabels.container }}</span>
            <input class="dc-input" v-model="userInput.container" />
          </label>
          <label class="dc-field">
            <span class="dc-label">{{ fieldLabels.port }}</span>
            <input class="dc-input" v-model="userInput.port" inputmode="numeric" />
          </label>
          <label class="dc-field">
            <span class="dc-label">{{ fieldLabels.puid }}</span>
            <input class="dc-input" v-model="userInput.puid" inputmode="numeric" />
          </label>
          <label class="dc-field">
            <span class="dc-label">{{ fieldLabels.pgid }}</span>
            <input class="dc-input" v-model="userInput.pgid" inputmode="numeric" />
          </label>
          <label class="dc-field" v-if="mode === 'advanced'">
            <span class="dc-label">Extra group IDs</span>
            <input class="dc-input" v-model="extras.extraGroups" placeholder="none, or e.g. 1001,1002" />
          </label>
          <label class="dc-field">
            <span class="dc-label">{{ fieldLabels.tz }}</span>
            <select class="dc-input" v-model="userInput.tz">
              <option value="">Don't set (UTC)</option>
              <option value="Etc/UTC">Etc/UTC</option>
              <option v-if="localTimeZone && localTimeZone !== 'Etc/UTC'" :value="localTimeZone">{{ localTimeZone }} (yours)</option>
              <optgroup v-for="group in timeZoneGroups" :key="group.region" :label="group.region">
                <option v-for="zone in group.zones" :key="zone" :value="zone">{{ zone }}</option>
              </optgroup>
            </select>
          </label>
        </div>
      </section>

      <section class="dc-section">
        <div class="dc-title-row">
          <div class="dc-title">{{ fieldLabels.volumes }}</div>
          <button type="button" class="dc-button" @click="addVolume">+ Add folder</button>
        </div>
        <div class="dc-volume dc-volume-head" aria-hidden="true">
          <span>On the host</span>
          <span></span>
          <span>In the container</span>
          <span></span>
        </div>
        <div v-for="(volume, index) in userInput.volumes" :key="index" class="dc-volume">
          <input
            class="dc-input dc-volume-host"
            :class="{ invalid: index > 0 && !isAbsoluteHostPath(volume[0]) }"
            :aria-label="index === 0 ? 'Folder for Shoko\'s data on the host' : 'Folder on the host'"
            :value="volume[0]"
            @input="updateVolume(index, 0, $event.target.value)"
          />
          <span class="dc-arrow" aria-hidden="true">→</span>
          <input
            class="dc-input dc-volume-inside"
            :class="{ invalid: index > 0 && !isAbsoluteContainerPath(volume[1]) }"
            :aria-label="index === 0 ? 'Folder for Shoko\'s data in the container' : 'Folder in the container'"
            :disabled="index === 0"
            :value="index === 0 ? configTarget : volume[1]"
            @input="updateVolume(index, 1, $event.target.value)"
          />
          <button v-if="index > 0" type="button" class="dc-remove" aria-label="Remove this folder" @click="removeVolume(index)">×</button>
          <span v-else class="dc-tag" title="Shoko's data folder, which can't be removed">data</span>
        </div>
        <p class="dc-note dc-note-error" v-if="invalidMediaVolumes">
          Use absolute paths for your media folders, both on the host (such as <code>/mnt/media/anime</code>) and
          in the container (such as <code>/mnt/anime</code>).
        </p>
        <p class="dc-note" v-if="mediaVolumeCount > 1">
          If Shoko moves files between these folders, such as from a drop folder into your library, mount the folder
          they share once instead, so files are moved rather than copied. See
          <a href="#docker-compose-recommended">Mount Folders You Move Files Between as One Volume</a>.
        </p>
        <p class="dc-note" v-if="configPathIsRelative">
          This path for Shoko's data is relative, so it depends on the folder you run Docker Compose from, and the
          same file can end up using another, empty folder. We recommend an absolute path, such as
          <code>/srv/shoko</code>.
        </p>
        <div class="dc-field dc-spaced" v-if="mode === 'advanced'">
          <span class="dc-label">Where Shoko keeps its data</span>
          <div class="dc-seg" role="radiogroup" aria-label="Where Shoko keeps its data">
            <label v-for="option in layoutOptions" :key="option.value" :class="{ active: configLayout === option.value }">
              <input type="radio" v-model="configLayout" :value="option.value" />{{ option.label }}
            </label>
          </div>
        </div>
      </section>

      <template v-if="mode === 'advanced'">
        <p class="dc-intro">
          The options below each add a few lines to the file. See
          <a href="/shoko-server/how-to/use-environment-variables">Use Environment Variables</a> for what they do.
        </p>

        <section class="dc-section">
          <div class="dc-title">Error Reports</div>
          <div class="dc-field">
            <div class="dc-seg" role="radiogroup" aria-label="Error reports">
              <label v-for="option in errorReportOptions" :key="option.value" :class="{ active: extras.errorReports === option.value }">
                <input type="radio" v-model="extras.errorReports" :value="option.value" />{{ option.label }}
              </label>
            </div>
          </div>
          <div class="dc-nested dc-spaced" v-if="extras.errorReports === 'own'">
            <label class="dc-field">
              <span class="dc-label">Sentry-compatible DSN</span>
              <input class="dc-input" v-model="extras.sentryDsn" placeholder="https://key@sentry.example.com/1" />
            </label>
            <div class="dc-field dc-spaced">
              <span class="dc-label" id="dc-sample-rate">Share of errors sent (default 0.5)</span>
              <div class="dc-range">
                <input type="range" min="0" max="1" step="0.05" v-model.number="extras.sentrySampleRate" aria-labelledby="dc-sample-rate" />
                <input
                  class="dc-input dc-range-value"
                  :class="{ invalid: !sampleRateIsValid }"
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  v-model.number="extras.sentrySampleRate"
                  aria-labelledby="dc-sample-rate"
                />
              </div>
              <span class="dc-note dc-note-error" v-if="!sampleRateIsValid">Use a number from 0 to 1.</span>
            </div>
            <div class="dc-field dc-spaced">
              <span class="dc-label">Plugins whose errors are sent</span>
              <div class="dc-seg" role="radiogroup" aria-label="Plugins whose errors are sent">
                <label v-for="option in sentryPluginOptions" :key="option.value" :class="{ active: extras.sentryPlugins === option.value }">
                  <input type="radio" v-model="extras.sentryPlugins" :value="option.value" />{{ option.label }}
                </label>
              </div>
            </div>
            <div class="dc-nested dc-spaced" v-if="extras.sentryPlugins === 'chosen'">
              <div class="dc-chips dc-chips-inline">
                <label v-for="plugin in firstPartyPlugins" :key="plugin.id" class="dc-chip" :class="{ active: extras.sentryPluginIds.includes(plugin.id) }" :title="plugin.id">
                  <input type="checkbox" v-model="extras.sentryPluginIds" :value="plugin.id" /> {{ plugin.name }}
                </label>
              </div>
              <label class="dc-field dc-spaced">
                <span class="dc-label">Other plugin IDs</span>
                <input
                  class="dc-input"
                  :class="{ invalid: invalidSentryPluginIds.length > 0 }"
                  v-model="extras.sentryOtherPluginIds"
                  placeholder="none, or plugin IDs separated by commas"
                />
              </label>
              <p class="dc-note dc-note-error" v-if="invalidSentryPluginIds.length > 0">
                Not a plugin ID: <code>{{ invalidSentryPluginIds.join(", ") }}</code>.
                A plugin ID looks like <code>d5b194ef-6f9d-455b-beb3-b23af899bb21</code>.
              </p>
              <p class="dc-note" v-else-if="chosenSentryPluginIds.length === 0">
                Pick at least one plugin. An empty list would send every plugin's errors.
              </p>
            </div>
          </div>
        </section>

        <section class="dc-section">
          <div class="dc-title">Telemetry</div>
          <div class="dc-field">
            <div class="dc-seg" role="radiogroup" aria-label="Telemetry">
              <label :class="{ active: !extras.telemetry }"><input type="radio" v-model="extras.telemetry" :value="false" />Off (default)</label>
              <label :class="{ active: extras.telemetry }"><input type="radio" v-model="extras.telemetry" :value="true" />To my own collector</label>
            </div>
          </div>
          <div class="dc-nested dc-spaced" v-if="extras.telemetry">
            <label class="dc-field">
              <span class="dc-label">Collector address</span>
              <input class="dc-input" v-model="extras.otlpEndpoint" placeholder="http://alloy:4318" />
            </label>
            <div class="dc-row dc-spaced">
              <div class="dc-field">
                <span class="dc-label">Protocol</span>
                <div class="dc-seg" role="radiogroup" aria-label="Protocol">
                  <label v-for="option in otlpProtocolOptions" :key="option.value" :class="{ active: extras.otlpProtocol === option.value }">
                    <input type="radio" :checked="extras.otlpProtocol === option.value" @change="setOtlpProtocol(option.value)" />{{ option.label }}
                  </label>
                </div>
              </div>
              <div class="dc-field">
                <span class="dc-label">Send</span>
                <div class="dc-chips dc-chips-inline">
                  <label class="dc-chip" :class="{ active: extras.otlpTraces }"><input type="checkbox" v-model="extras.otlpTraces" /> Traces</label>
                  <label class="dc-chip" :class="{ active: extras.otlpMetrics }"><input type="checkbox" v-model="extras.otlpMetrics" /> Metrics</label>
                  <label class="dc-chip" :class="{ active: extras.otlpLogs }"><input type="checkbox" v-model="extras.otlpLogs" /> Logs</label>
                </div>
              </div>
            </div>
            <div class="dc-grid dc-spaced">
              <label class="dc-field">
                <span class="dc-label">Service name</span>
                <input class="dc-input" v-model="extras.otlpServiceName" placeholder="shoko-server (default)" />
              </label>
              <label class="dc-field">
                <span class="dc-label">Export timeout (ms)</span>
                <input
                  class="dc-input"
                  :class="{ invalid: !isIntegerInRange(extras.otlpTimeoutMs, 100, 60000) }"
                  v-model="extras.otlpTimeoutMs"
                  inputmode="numeric"
                  placeholder="5000 (default)"
                />
              </label>
              <label class="dc-field" v-if="extras.otlpMetrics">
                <span class="dc-label">Metric interval (seconds)</span>
                <input
                  class="dc-input"
                  :class="{ invalid: !isIntegerInRange(extras.otlpMetricInterval, 1, 3600) }"
                  v-model="extras.otlpMetricInterval"
                  inputmode="numeric"
                  placeholder="60 (default)"
                />
              </label>
              <label class="dc-field" v-if="extras.otlpLogs">
                <span class="dc-label">Log level</span>
                <select class="dc-input" v-model="extras.otlpLogLevel">
                  <option v-for="level in otlpLogLevels" :key="level.value" :value="level.value">{{ level.label }}</option>
                </select>
              </label>
            </div>
            <label class="dc-field dc-spaced">
              <span class="dc-label">Headers</span>
              <input class="dc-input" v-model="extras.otlpHeaders" placeholder="none, or e.g. authorization=Bearer token,x-scope-orgid=shoko" />
            </label>
            <p class="dc-note dc-note-error" v-if="!otlpNumbersAreValid">
              Use a whole number from 100 to 60000 for the timeout and from 1 to 3600 for the metric interval, or leave
              them empty for the default.
            </p>
            <template v-if="extras.otlpTraces">
              <div class="dc-field dc-spaced">
                <span class="dc-label" id="dc-trace-ratio">Share of traces kept (default 1)</span>
                <div class="dc-range">
                  <input type="range" min="0" max="1" step="0.05" v-model.number="extras.otlpTraceRatio" aria-labelledby="dc-trace-ratio" />
                  <input class="dc-input dc-range-value" :class="{ invalid: !isRatio(extras.otlpTraceRatio) }" type="number" min="0" max="1" step="0.05" v-model.number="extras.otlpTraceRatio" aria-labelledby="dc-trace-ratio" />
                </div>
              </div>
              <div class="dc-field dc-spaced">
                <span class="dc-label" id="dc-job-ratio">Share of queue task traces kept (default 1)</span>
                <div class="dc-range">
                  <input type="range" min="0" max="1" step="0.05" v-model.number="extras.otlpJobTraceRatio" aria-labelledby="dc-job-ratio" />
                  <input class="dc-input dc-range-value" :class="{ invalid: !isRatio(extras.otlpJobTraceRatio) }" type="number" min="0" max="1" step="0.05" v-model.number="extras.otlpJobTraceRatio" aria-labelledby="dc-job-ratio" />
                </div>
              </div>
              <p class="dc-note dc-note-error" v-if="!isRatio(extras.otlpTraceRatio) || !isRatio(extras.otlpJobTraceRatio)">
                Use a number from 0 to 1.
              </p>
              <label class="dc-check dc-spaced">
                <input type="checkbox" v-model="extras.otlpDbSpans" /> Add a span for every database command
              </label>
              <label class="dc-check dc-check-nested" v-if="extras.otlpDbSpans">
                <input type="checkbox" v-model="extras.otlpDbStatements" /> Include each command's SQL, with its values left out
              </label>
            </template>
          </div>
        </section>

        <section class="dc-section">
          <div class="dc-title">Access</div>
          <label class="dc-check">
            <input type="checkbox" v-model="extras.setupToken" /> Protect setup and failure mode with a setup token
          </label>
          <div class="dc-nested" v-if="extras.setupToken">
            <label class="dc-field">
              <span class="dc-label">Setup token</span>
              <input class="dc-input" v-model="extras.setupTokenValue" />
            </label>
          </div>
          <label class="dc-check">
            <input type="checkbox" v-model="extras.allowShutdown" /> Allow shutting the server down from the Web UI
          </label>
          <label class="dc-check">
            <input type="checkbox" v-model="extras.noRestart" /> Don't allow restarting the server from the Web UI
          </label>
        </section>

        <section class="dc-section">
          <div class="dc-title">Plugins</div>
          <label class="dc-check">
            <input type="checkbox" v-model="extras.keepPlugins" /> Don't upgrade plugins when the server starts
          </label>
          <label class="dc-check">
            <input type="checkbox" v-model="extras.skipBundled" /> Leave the plugins that ship with Shoko alone
          </label>
        </section>

        <section class="dc-section">
          <div class="dc-title">GPU &amp; Packages</div>
          <div class="dc-field">
            <span class="dc-label">GPU passthrough</span>
            <div class="dc-seg dc-seg-wrap" role="radiogroup" aria-label="GPU passthrough">
              <label v-for="option in gpuOptions" :key="option.value" :class="{ active: extras.gpu === option.value }" :title="option.title">
                <input type="radio" v-model="extras.gpu" :value="option.value" />{{ option.label }}
              </label>
            </div>
          </div>
          <div class="dc-nested" v-if="extras.gpu !== 'none'">
            <p class="dc-note">
              Only useful with a plugin that uses hardware transcoding.
              The container installs ffmpeg for it<template v-if="extras.gpu === 'intel' || extras.gpu === 'amd'"> and the
              GPU's drivers</template>, along with any extra packages below.
              <template v-if="extras.gpu === 'nvidia'">
                Needs the <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA Container Toolkit</a> on the host.
              </template>
              <template v-if="extras.gpu === 'rpi'">
                These are the Raspberry Pi 4's hardware codec. The Raspberry Pi 5 has no hardware H.264 encoder.
              </template>
            </p>
            <div class="dc-grid">
              <label class="dc-field" v-if="extras.gpu === 'other'">
                <span class="dc-label">Device</span>
                <input class="dc-input" v-model="extras.devicePath" placeholder="/dev/dri:/dev/dri" />
              </label>
              <label class="dc-field" v-if="extras.gpu !== 'nvidia'">
                <span class="dc-label">{{ gpuGroupLabel }}</span>
                <input class="dc-input" v-model="extras.deviceGroup" :placeholder="gpuGroupHint" />
              </label>
            </div>
          </div>
          <label class="dc-field dc-spaced">
            <span class="dc-label">Extra packages to install</span>
            <input class="dc-input" v-model="extras.packages" placeholder="none" />
          </label>
        </section>
      </template>
    </div>

    <div class="dc-output">
      <div class="dc-output-bar">
        <span class="dc-file">docker-compose.yml</span>
        <div class="dc-actions">
          <button type="button" class="dc-button dc-copy" :class="copyState" @click="copyCompose" aria-live="polite">{{ copyState === "copied" ? "Copied!" : copyState === "failed" ? "Couldn't copy" : "Copy" }}</button>
          <button type="button" class="dc-button" @click="downloadCompose">Download</button>
        </div>
      </div>
      <pre v-html="highlightedCode" class="dc-code docker-output-codeblock"></pre>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';

// Register YAML language for highlighting
hljs.registerLanguage('yaml', yaml);

export default {
  setup() {
    const fieldLabels = {
      container: "Container Name",
      puid: "User ID (PUID)",
      pgid: "Group ID (PGID)",
      tz: "Time Zone (TZ)",
      port: "Port",
      volumes: "Volumes",
    };

    const initialUserInput = {
      container: "shoko",
      puid: "1000",
      pgid: "100",
      tz: "Etc/UTC",
      port: "8111",
      volumes: [
        ["<absolute path for Shoko's data>", "/home/shoko/.shoko"],
        ["<edit path before use>", "/mnt/anime"],
      ],
    };

    const userInput = ref({ ...initialUserInput });

    const mode = ref("simple");
    const configLayout = ref("home");
    // Simple mode writes the plain file; the advanced choices are kept for when it's switched back.
    const effectiveLayout = computed(() => (mode.value === "advanced" ? configLayout.value : "home"));
    const configTarget = computed(() => "/home/shoko/.shoko");
    // A placeholder still to be filled in (<…>) and an empty field aren't judged yet.
    const isPending = (path) => path.trim() === "" || path.trim().startsWith("<");
    const isAbsoluteHostPath = (path) => isPending(path) || path.trim().startsWith("/") || /^[A-Za-z]:[\\/]/.test(path.trim());
    const isAbsoluteContainerPath = (path) => isPending(path) || path.trim().startsWith("/");
    const configPathIsRelative = computed(() => !isAbsoluteHostPath(userInput.value.volumes[0]?.[0] ?? ""));
    const mediaVolumeCount = computed(() => userInput.value.volumes.filter((volume, index) => index > 0 && (volume[0].trim() || volume[1].trim())).length);
    const invalidMediaVolumes = computed(() => userInput.value.volumes.some((volume, index) =>
      index > 0 && (!isAbsoluteHostPath(volume[0]) || !isAbsoluteContainerPath(volume[1]))));

    const defaultExtras = {
      registry: "ghcr",
      channel: "latest",
      errorReports: "team",
      sentryDsn: "",
      // The server's own default: half of all errors.
      sentrySampleRate: 0.5,
      // "first" (the server's default), "all" or "chosen".
      sentryPlugins: "first",
      sentryPluginIds: [],
      sentryOtherPluginIds: "",
      telemetry: false,
      otlpEndpoint: "http://alloy:4318",
      otlpProtocol: "HttpProtobuf",
      otlpTraces: true,
      otlpMetrics: true,
      otlpLogs: false,
      otlpServiceName: "",
      otlpTimeoutMs: "",
      otlpMetricInterval: "",
      otlpLogLevel: "",
      otlpHeaders: "",
      otlpTraceRatio: 1,
      otlpJobTraceRatio: 1,
      otlpDbSpans: false,
      otlpDbStatements: true,
      setupToken: false,
      setupTokenValue: "",
      keepPlugins: false,
      skipBundled: false,
      extraGroups: "",
      gpu: "none",
      devicePath: "",
      deviceGroup: "",
      packages: "",
      allowShutdown: false,
      noRestart: false,
    };
    // A deep copy, so the lists in it never change the defaults.
    const extras = ref(structuredClone(defaultExtras));

    const updateInput = (key, value) => {
      userInput.value[key] = value;
    };

    const updateVolume = (index, position, value) => {
      userInput.value.volumes[index][position] = value;
    };

    const addVolume = () => {
      userInput.value.volumes.push(["", ""]);
    };

    const removeVolume = (index) => {
      userInput.value.volumes.splice(index, 1);
    };

    // The devices each GPU choice passes in; NVIDIA's come through its container runtime instead.
    const gpuDevices = (x) => {
      switch (x.gpu) {
        case "intel":
        case "amd":
          return ["/dev/dri:/dev/dri"];
        case "rpi":
          return ["/dev/video10:/dev/video10", "/dev/video11:/dev/video11", "/dev/video12:/dev/video12"];
        case "other":
          return x.devicePath.trim() ? [x.devicePath.trim()] : [];
        default:
          return [];
      }
    };
    const gpuGroupLabel = computed(() => (extras.value.gpu === "rpi" ? "Video group ID on the host" : extras.value.gpu === "other" ? "Its group ID on the host" : "Render group ID on the host"));
    const gpuGroupHint = computed(() => (extras.value.gpu === "rpi" ? "stat -c '%g' /dev/video10" : "stat -c '%g' /dev/dri/renderD128"));
    // The drivers each GPU needs inside the container, installed along with any packages listed by hand. NVIDIA's come
    // through its container runtime, and the Raspberry Pi's codec is in the kernel.
    const gpuPackages = {
      intel: ["libva2", "libva-drm2", "intel-media-va-driver-non-free", "libmfx1", "libmfx-gen1.2"],
      amd: ["libva2", "libva-drm2", "mesa-va-drivers"],
    };

    // A share from 0 to 1, as the number fields and sliders give it.
    const isRatio = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
    // An empty field means the default, so it counts as valid.
    const isIntegerInRange = (value, min, max) => {
      const text = `${value ?? ""}`.trim();
      if (!text)
        return true;
      if (!/^\d+$/.test(text))
        return false;
      const number = Number(text);
      return number >= min && number <= max;
    };
    const sampleRateIsValid = computed(() => isRatio(extras.value.sentrySampleRate));
    const sentryPluginOptions = [
      { value: "first", label: "First-party only (default)" },
      { value: "all", label: "All plugins" },
      { value: "chosen", label: "I'll choose" },
    ];
    // The plugins the Shoko team ships, whose errors are sent by default.
    const firstPartyPlugins = [
      { id: "d5b194ef-6f9d-455b-beb3-b23af899bb21", name: "Legacy Plex" },
      { id: "85d0c34f-240f-4da3-8512-d0b45118a9f4", name: "TMDB" },
      { id: "e73c1e23-111a-4cf0-bab8-054b738c5101", name: "AniList" },
      { id: "72a6ff39-2bff-534c-9216-d03cd38e7346", name: "Offline Importer" },
      { id: "8c8d75f2-cd0c-5c0b-9a9e-8c2c6d3e5f1a", name: "WebAOM" },
    ];
    const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const otherSentryPluginIds = computed(() => extras.value.sentryOtherPluginIds.split(/[\s,]+/).filter(Boolean));
    const invalidSentryPluginIds = computed(() => otherSentryPluginIds.value.filter((id) => !guidPattern.test(id)));
    // The chosen plugins, each once, whatever case they were typed in.
    const chosenSentryPluginIds = computed(() => [...new Set([
      ...extras.value.sentryPluginIds,
      ...otherSentryPluginIds.value.filter((id) => guidPattern.test(id)).map((id) => id.toLowerCase()),
    ])]);
    const otlpNumbersAreValid = computed(() =>
      isIntegerInRange(extras.value.otlpTimeoutMs, 100, 60000) && isIntegerInRange(extras.value.otlpMetricInterval, 1, 3600));
    const otlpProtocolOptions = [
      { value: "HttpProtobuf", label: "HTTP (default)" },
      { value: "Grpc", label: "gRPC" },
    ];
    const otlpLogLevels = [
      { value: "", label: "Information (default)" },
      { value: "Trace", label: "Trace" },
      { value: "Debug", label: "Debug" },
      { value: "Warning", label: "Warning" },
      { value: "Error", label: "Error" },
      { value: "Critical", label: "Critical" },
    ];
    // Moves the address to the protocol's usual port when it is still on the other one's.
    const setOtlpProtocol = (protocol) => {
      const x = extras.value;
      const [from, to] = protocol === "Grpc" ? [":4318", ":4317"] : [":4317", ":4318"];
      if (x.otlpEndpoint.trim().endsWith(from))
        x.otlpEndpoint = x.otlpEndpoint.trim().slice(0, -from.length) + to;
      x.otlpProtocol = protocol;
    };

    const composeCode = computed(() => {
      const input = userInput.value;
      const x = mode.value === "advanced" ? extras.value : defaultExtras;
      const env = [
        `PUID=${input.puid}`,
        `PGID=${input.pgid}`,
        ...(input.tz ? [`TZ=${input.tz}`] : []),
        // Keeps the server on the port the mapping below points at, whatever the settings file says.
        "SHOKO_PORT=8111",
      ];
      if (effectiveLayout.value === "flat")
        env.push("SHOKO_HOME=/home/shoko/.shoko");
      if (x.errorReports === "off")
        env.push("SHOKO_SENTRY_DSN=off");
      else if (x.errorReports === "own") {
        env.push(`SHOKO_SENTRY_DSN=${x.sentryDsn || "<your DSN>"}`);
        if (sampleRateIsValid.value)
          env.push(`SHOKO_SENTRY_SAMPLE_RATE=${x.sentrySampleRate}`);
        if (x.sentryPlugins === "all")
          env.push("SHOKO_SENTRY_PLUGINS=[]");
        else if (x.sentryPlugins === "chosen" && invalidSentryPluginIds.value.length === 0 && chosenSentryPluginIds.value.length > 0)
          env.push(`SHOKO_SENTRY_PLUGINS=${JSON.stringify(chosenSentryPluginIds.value)}`);
      }
      if (x.telemetry) {
        // Only what differs from the server's defaults is written.
        env.push(`SHOKO_OTLP_ENDPOINT=${x.otlpEndpoint.trim() || "<your collector>"}`);
        if (x.otlpProtocol !== "HttpProtobuf")
          env.push(`SHOKO_OTLP_PROTOCOL=${x.otlpProtocol}`);
        if (x.otlpTraces)
          env.push("SHOKO_OTLP_TRACES_ENABLED=true");
        if (x.otlpMetrics)
          env.push("SHOKO_OTLP_METRICS_ENABLED=true");
        if (x.otlpLogs)
          env.push("SHOKO_OTLP_LOGS_ENABLED=true");
        if (x.otlpServiceName.trim())
          env.push(`SHOKO_OTLP_SERVICE_NAME=${x.otlpServiceName.trim()}`);
        if (x.otlpHeaders.trim())
          env.push(`SHOKO_OTLP_HEADERS=${x.otlpHeaders.trim()}`);
        if (`${x.otlpTimeoutMs}`.trim() && isIntegerInRange(x.otlpTimeoutMs, 100, 60000))
          env.push(`SHOKO_OTLP_TIMEOUT_MS=${`${x.otlpTimeoutMs}`.trim()}`);
        if (x.otlpMetrics && `${x.otlpMetricInterval}`.trim() && isIntegerInRange(x.otlpMetricInterval, 1, 3600))
          env.push(`SHOKO_OTLP_METRIC_INTERVAL_SECONDS=${`${x.otlpMetricInterval}`.trim()}`);
        if (x.otlpLogs && x.otlpLogLevel)
          env.push(`LOGGING_OTLP_LOG_LEVEL=${x.otlpLogLevel}`);
        if (x.otlpTraces) {
          if (isRatio(x.otlpTraceRatio) && x.otlpTraceRatio !== 1)
            env.push(`SHOKO_OTLP_TRACE_SAMPLE_RATIO=${x.otlpTraceRatio}`);
          if (isRatio(x.otlpJobTraceRatio) && x.otlpJobTraceRatio !== 1)
            env.push(`SHOKO_OTLP_JOB_TRACE_SAMPLE_RATIO=${x.otlpJobTraceRatio}`);
          if (x.otlpDbSpans) {
            env.push("SHOKO_OTLP_DB_SPANS_ENABLED=true");
            if (!x.otlpDbStatements)
              env.push("SHOKO_OTLP_DB_STATEMENTS_ENABLED=false");
          }
        }
      }
      if (x.setupToken)
        env.push(`SHOKO_SETUP_TOKEN=${x.setupTokenValue || "<your setup token>"}`);
      if (x.keepPlugins)
        env.push("SHOKO_PLUGIN_UPGRADE_ON_START_ENABLED=false");
      if (x.skipBundled)
        env.push("SHOKO_PLUGIN_SKIP_BUNDLED_UPGRADES=true");
      const groups = [...x.extraGroups.split(/[\s,]+/), x.gpu !== "none" && x.gpu !== "nvidia" ? x.deviceGroup : ""]
        .map((group) => group.trim())
        .filter((group, index, all) => group && all.indexOf(group) === index);
      if (groups.length > 0)
        env.push(`EXTRA_GROUPS=${groups.join(",")}`);

      // Any GPU choice installs an ffmpeg built against the image's own libraries and points transcoding at it.
      const transcoding = x.gpu !== "none";
      const packages = [...x.packages.split(/[\s,]+/), ...(gpuPackages[x.gpu] ?? []), ...(transcoding ? ["ffmpeg"] : [])]
        .map((name) => name.trim())
        .filter((name, index, all) => name && all.indexOf(name) === index);
      if (packages.length > 0)
        env.push(`INSTALL_PACKAGES=${packages.join(",")}`);
      if (transcoding)
        env.push("SHOKO_FFMPEG_PATH=/usr/bin/ffmpeg");
      if (x.allowShutdown)
        env.push("ENABLE_SHUTDOWN=true");
      if (x.noRestart)
        env.push("ENABLE_RESTART=false");

      const lines = [
        "services:",
        "  shoko:",
        "    shm_size: 256m",
        `    container_name: ${input.container}`,
        `    image: ${x.registry === "dockerhub" ? "shokoanime/server" : "ghcr.io/shokoanime/server"}:${x.channel}`,
      ];
      if (x.allowShutdown) {
        // A shutdown exits cleanly, so only restart after a crash, or the container would come straight back.
        lines.push("    # Restarted after a crash, but not after a shutdown from the Web UI.");
        lines.push("    restart: on-failure");
      } else {
        lines.push("    restart: unless-stopped");
      }
      lines.push("    environment:");
      // A value with double quotes in it, such as a JSON list, is written in single quotes instead.
      for (const entry of env)
        lines.push(entry.includes('"') ? `      - '${entry.replaceAll("'", "''")}'` : `      - "${entry}"`);
      lines.push("    ports:");
      lines.push(`      - "${input.port}:8111"`);
      const devices = gpuDevices(x);
      if (devices.length > 0) {
        lines.push("    devices:");
        for (const device of devices)
          lines.push(`      - "${device}"`);
      }
      if (x.gpu === "nvidia") {
        lines.push("    deploy:");
        lines.push("      resources:");
        lines.push("        reservations:");
        lines.push("          devices:");
        lines.push("            - driver: nvidia");
        lines.push("              count: all");
        // video brings the encoder and decoder libraries; gpu alone only brings CUDA.
        lines.push("              capabilities: [gpu, video]");
      }
      lines.push("    volumes:");
      input.volumes.forEach((volume, index) => {
        const target = index === 0 ? configTarget.value : volume[1];
        if (volume[0] && target)
          lines.push(`      - "${volume[0]}:${target}"`);
      });
      return lines.join("\n");
    });

    // Add computed property for highlighted code
    const highlightedCode = computed(() => {
      return hljs.highlight(composeCode.value, { language: 'yaml' }).value;
    });

    // "idle", "copied" or "failed", shown on the button for a moment.
    const copyState = ref("idle");
    let copyTimer;
    // The clipboard API only exists on secure pages (https or localhost); a plain http page falls back to a hidden
    // text field and the browser's copy command.
    const writeClipboard = async (text) => {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      if (!ok)
        throw new Error("Copy was refused.");
    };
    const copyCompose = async () => {
      try {
        await writeClipboard(composeCode.value + "\n");
        copyState.value = "copied";
      } catch {
        copyState.value = "failed";
      }
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copyState.value = "idle"), 2000);
    };

    const downloadCompose = () => {
      const blob = new Blob([composeCode.value + "\n"], { type: "text/yaml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "docker-compose.yml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    // Every IANA time zone the browser knows, grouped by region. The built page starts on Etc/UTC; once it runs in the
    // visitor's browser it switches to their own time zone, so the server's logs match their clock, unless they already
    // picked one.
    const timeZones = (() => {
      try {
        return Intl.supportedValuesOf("timeZone");
      } catch {
        return [];
      }
    })();
    const timeZoneGroups = [];
    for (const zone of timeZones.filter((name) => name.includes("/"))) {
      const region = zone.split("/")[0];
      const group = timeZoneGroups.at(-1)?.region === region ? timeZoneGroups.at(-1) : timeZoneGroups.find((entry) => entry.region === region);
      if (group)
        group.zones.push(zone);
      else
        timeZoneGroups.push({ region, zones: [zone] });
    }
    const localTimeZone = ref("");
    onMounted(() => {
      try {
        localTimeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
      } catch {
        localTimeZone.value = "";
      }
      if (localTimeZone.value === "UTC")
        localTimeZone.value = "Etc/UTC";
      if (localTimeZone.value && userInput.value.tz === initialUserInput.tz)
        userInput.value.tz = localTimeZone.value;
    });

    const registryOptions = [
      { value: "ghcr", label: "GitHub (default)" },
      { value: "dockerhub", label: "Docker Hub" },
    ];
    const channelOptions = [
      { value: "latest", label: "Stable (latest)" },
      { value: "daily", label: "Daily (daily)" },
    ];
    const layoutOptions = [
      { value: "home", label: "In a Shoko.CLI folder (default)" },
      { value: "flat", label: "Directly in the folder (SHOKO_HOME)" },
    ];
    const errorReportOptions = [
      { value: "team", label: "To the Shoko team (default)" },
      { value: "off", label: "None" },
      { value: "own", label: "To my own server" },
    ];
    const gpuOptions = [
      { value: "none", label: "None" },
      { value: "intel", label: "Intel", title: "VA-API and Quick Sync" },
      { value: "amd", label: "AMD", title: "VA-API" },
      { value: "nvidia", label: "NVIDIA", title: "NVENC and NVDEC" },
      { value: "rpi", label: "Raspberry Pi", title: "V4L2" },
      { value: "other", label: "Another device" },
    ];

    return {
      sampleRateIsValid,
      sentryPluginOptions,
      firstPartyPlugins,
      invalidSentryPluginIds,
      chosenSentryPluginIds,
      isRatio,
      isIntegerInRange,
      otlpNumbersAreValid,
      otlpProtocolOptions,
      otlpLogLevels,
      setOtlpProtocol,
      timeZoneGroups,
      localTimeZone,
      registryOptions,
      channelOptions,
      layoutOptions,
      errorReportOptions,
      gpuOptions,
      gpuGroupLabel,
      gpuGroupHint,
      copyState,
      copyCompose,
      downloadCompose,
      mode,
      fieldLabels,
      userInput,
      configLayout,
      configTarget,
      configPathIsRelative,
      isAbsoluteHostPath,
      isAbsoluteContainerPath,
      invalidMediaVolumes,
      mediaVolumeCount,
      extras,
      updateInput,
      updateVolume,
      addVolume,
      removeVolume,
      composeCode,
      highlightedCode,
    };
  },
};
</script>

<style>
.dc {
  margin: 1rem 0;
}

.dc-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.25rem 1.25rem;
}

.dc-section {
  padding: 1rem 0;
}

.dc-section + .dc-section,
.dc-intro + .dc-section {
  border-top: 1px solid var(--vp-c-divider);
}

.dc-title {
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.dc-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.dc-title-row .dc-title {
  margin-bottom: 0;
}

.dc-intro {
  margin: 0;
  padding: 0.75rem 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.dc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 0.75rem 1rem;
}

.dc-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.dc-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.dc-spaced {
  margin-top: 0.85rem;
}

.dc-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.dc-input {
  width: 100%;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  transition: border-color 0.15s;
}

.dc-input:hover {
  border-color: var(--vp-c-border);
}

.dc-input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.dc-input:disabled {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.dc-input.invalid {
  border-color: var(--vp-c-danger-1);
  box-shadow: 0 0 0 1px var(--vp-c-danger-1);
}

.dc-input::placeholder {
  color: var(--vp-c-text-3);
}

/* Segmented choices: radio buttons drawn as one bar. */
.dc-seg {
  display: inline-flex;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  padding: 3px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg);
  gap: 2px;
}

.dc-seg label {
  position: relative;
  padding: 0.35rem 0.8rem;
  border-radius: 7px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s, color 0.15s;
}

.dc-seg label:hover {
  color: var(--vp-c-text-1);
}

.dc-seg label.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.dc-seg input,
.dc-chip input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.dc-seg label:has(input:focus-visible),
.dc-chip:has(input:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.dc-check {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.3rem 0;
  font-size: 0.9rem;
  cursor: pointer;
}

.dc-check input {
  margin-top: 0.3rem;
  accent-color: var(--vp-c-brand-1);
}

.dc-nested {
  margin: 0.4rem 0 0.6rem 0.4rem;
  padding-left: 1rem;
  border-left: 2px solid var(--vp-c-divider);
}

.dc-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dc-range input[type="range"] {
  flex: 1;
  min-width: 0;
  accent-color: var(--vp-c-brand-1);
}

.dc-range-value {
  width: 5.5rem;
  flex: none;
}

.dc-chips.dc-chips-inline {
  margin-top: 0;
  align-items: center;
  min-height: 2.35rem;
}

.dc-check-nested {
  margin-left: 1.6rem;
}

.dc-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.dc-chip {
  position: relative;
  padding: 0.25rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background-color: var(--vp-c-bg);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.dc-chip.active {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.dc-chip.active::before {
  content: "✓ ";
}

/* Volumes: host → container, one row each. */
.dc-volume {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) 2.75rem;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.dc-volume-head {
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.dc-arrow {
  color: var(--vp-c-text-3);
}

.dc-remove {
  width: 2.25rem;
  height: 2.25rem;
  justify-self: center;
  border-radius: 8px;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.dc-remove:hover {
  background-color: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.dc-tag {
  justify-self: center;
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.dc-note {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.dc-nested > .dc-note {
  margin: 0 0 0.75rem;
}

.dc-note-error {
  color: var(--vp-c-danger-1);
}

.dc-button {
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: border-color 0.15s, color 0.15s;
}

.dc-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* The output, drawn like a code block with a file tab. */
.dc-output {
  margin-top: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-code-block-bg);
}

.dc-output-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dc-file {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.dc-actions {
  display: flex;
  gap: 0.5rem;
}

.dc-copy.copied {
  border-color: var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.dc-copy.failed {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}

.dc-code {
  margin: 0;
  padding: 1rem 1.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  color: var(--vp-c-text-1);
}

/* YAML colours for light and dark. */
.dc-code .hljs-attr { color: #005cc5; }
.dc-code .hljs-string { color: #032f62; }
.dc-code .hljs-number,
.dc-code .hljs-literal { color: #005cc5; }
.dc-code .hljs-bullet,
.dc-code .hljs-meta { color: #d73a49; }
.dc-code .hljs-comment { color: #6a737d; font-style: italic; }
.dark .dc-code .hljs-attr { color: #79c0ff; }
.dark .dc-code .hljs-string { color: #a5d6ff; }
.dark .dc-code .hljs-number,
.dark .dc-code .hljs-literal { color: #79c0ff; }
.dark .dc-code .hljs-bullet,
.dark .dc-code .hljs-meta { color: #ff7b72; }
.dark .dc-code .hljs-comment { color: #8b949e; }

/* The Simple | Advanced pill, pulled up onto the heading's line on wide screens. */
.docker-mode {
  display: flex;
  width: fit-content;
  position: relative;
  z-index: 1;
  margin: -1.85rem 0 1rem auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  overflow: hidden;
}

.docker-mode button {
  padding: 0.25rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.docker-mode button.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .docker-mode {
    margin-top: 0;
  }

  .dc-card {
    padding: 0.25rem 1rem;
  }

  /* Host above container, with the remove button beside both. */
  .dc-volume {
    grid-template-columns: minmax(0, 1fr) 2.75rem;
    grid-template-areas: "host action" "inside action";
    gap: 0.35rem 0.5rem;
    margin-bottom: 0.85rem;
  }

  .dc-volume-host { grid-area: host; }
  .dc-volume-inside { grid-area: inside; }
  .dc-remove, .dc-tag { grid-area: action; }
  .dc-arrow, .dc-volume-head { display: none; }
}
</style>
