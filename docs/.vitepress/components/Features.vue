<template>
  <div class="group-wrapper">
    <!-- Group Title -->
    <div v-if="groupTitle" class="group-title">
      {{ groupTitle }}
    </div>

    <!-- Feature Cards -->
    <div class="feature-wrapper">
      <a
        v-for="(feature, index) in features"
        :key="index"
        :href="feature.link"
        class="feature-card"
      >
        <div class="feature-inner">
          <!-- Handle Lucide Icon -->
          <component
            v-if="isLucideIcon(feature.icon)"
            :is="feature.icon"
            class="text-xl feature-icon"
          />

          <!-- Handle External SVG Files -->
          <img
            v-else-if="isSvgFile(feature.icon)"
            :src="feature.icon"
            alt="feature-icon"
            class="feature-svg"
          />

          <div class="feature-title">
            {{ feature.title }}
          </div>
        </div>
        <div class="feature-info">
          {{ feature.info }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { Palette, FilePenLine, CircleHelp } from "lucide-vue-next";

export default {
  components: {
    Palette,
    FilePenLine,
    CircleHelp,
  },
  props: {
    features: {
      type: Array,
      required: true,
      default: () => [],
    },
    groupTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    isLucideIcon(icon) {
      return typeof icon === "string" && /^[A-Z]/.test(icon);
    },
    isSvgFile(icon) {
      return typeof icon === "string" && /\.svg$/i.test(icon);
    },
  },
};
</script>

<style scoped>
.group-wrapper {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}

.group-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 425px) {
  .feature-wrapper {
    flex-direction: column;
  }

  .feature-card {
    width: 100% !important;
  }
}

.feature-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.feature-card {
  height: auto;
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;
  padding: 1.5rem;
  width: calc(100% / 3 - 15px);
  text-decoration: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}

.feature-inner {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.feature-title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.feature-info {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.feature-icon {
  color: var(--vp-c-text-1);
}

.feature-svg {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>
