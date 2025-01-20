<template>
  <div>
    <div class="docker-compose-wrapper">
      <!-- Iterate over each user input and render the corresponding input field -->
      <div v-for="(value, key) in userInput" :key="key">
        <div>
          <!-- Check if the input field is volumes -->
          <div class="docker-input-wrapper" v-if="key !== 'volumes'">
            <div class="docker-input-text">{{ fieldLabels[key] || key }}:</div>
            <input
                class="docker-input-input"
                :id="key"
                :value="userInput[key]"
                @input="updateInput(key, $event.target.value)"
            />
          </div>
          <div v-else class="docker-input-volume-wrapper">
            <div class="docker-input-volume-text">
              <div class="docker-input-text">{{ fieldLabels[key] || key }}:</div>
              <button class="docker-input-button" @click="addVolume">Add</button>
            </div>
            <!-- Render each volume input -->
            <div v-for="(volume, index) in userInput.volumes" :key="index" class="docker-input-volume-row">
              <button
                  v-if="index > 0"
                  class="docker-input-button"
                  type="button"
                  @click="removeVolume(index)"
              >
                Delete
              </button>
              <input
                  class="docker-input-input docker-input-input-outside"
                  :value="volume[0]"
                  @input="updateVolume(index, 0, $event.target.value)"
              />
              <input
                  :disabled="index === 0"
                  class="docker-input-input docker-input-input-inside"
                  :value="volume[1]"
                  @input="updateVolume(index, 1, $event.target.value)"
              />
            </div>
          </div>
        </div>
        <hr class="docker-input-hr"/>
      </div>
    </div>
    <!-- Display the generated docker-compose YAML code -->
    <div class="expressive-code">
      <pre class="docker-output-codeblock">
        <code>{{ composeCode }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";

export default {
  setup() {
    const fieldLabels = {
      container: "Container",
      puid: "PUID",
      pgid: "PGID",
      tz: "Time Zone",
      port: "Port",
      volumes: "Volumes",
    };

    const initialUserInput = {
      container: "shoko_server",
      puid: "$UID",
      pgid: "$GID",
      tz: "Etc/UTC",
      port: "8111",
      volumes: [
        ["./shoko-config", "/home/shoko/.shoko"],
        ["<edit this path before use>", "/mnt/anime"]
      ],
    };

    const userInput = ref({...initialUserInput});

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

    const composeCode = computed(() => {
      return `
version: "3"
services:
  shoko_server:
    shm_size: 256m
    container_name: ${userInput.value.container}
    image: ghcr.io/shokoanime/server:latest
    restart: always
    environment:
      - "PUID=${userInput.value.puid}"
      - "PGID=${userInput.value.pgid}"
      - "TZ=${userInput.value.tz}"
    ports:
      - "${userInput.value.port}:8111"
    volumes:
      ${userInput.value.volumes.filter((volume) => volume[0] && volume[1]).map((volume) => `- \"${volume.join(":")}\"`).join("\n      ")}`;
    });

    return {
      fieldLabels,
      userInput,
      updateInput,
      updateVolume,
      addVolume,
      removeVolume,
      composeCode,
    };
  },
};
</script>

<style scoped>
.docker-compose-wrapper {
  padding: 1rem 0;
}

.docker-input-wrapper {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
}

.docker-input-text {
  font-weight: bold;
}

.docker-input-input {
  background-color: var(--vp-sidebar-bg-color);
  padding: 1rem;
  border-radius: .5rem;
}

.docker-input-volume-wrapper {
  display: flex;
  flex-direction: column;
}

.docker-input-volume-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.docker-input-volume-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin: .5rem 0 .5rem auto;
  gap: 0.5rem
}

.docker-input-button {
  background-color: var(--vp-sidebar-bg-color);
  padding: 1rem;
  border-radius: 0.5rem;
}

.docker-input-hr {
  margin: 10px 0;
}

.expressive-code {
  background-color: var(--vp-sidebar-bg-color);
  padding: 0 1rem;
  border-radius: 0.5rem;
}

.docker-output-codeblock {
  margin: 0;
  white-space: pre-wrap;
}
</style>
