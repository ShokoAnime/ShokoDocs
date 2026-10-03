<script setup>
import DefaultTheme from "vitepress/theme";
import { computed, onMounted } from "vue";
import { useData, useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import NotFound from "../components/NotFound.vue";

const { Layout } = DefaultTheme;
const router = useRouter();
const { theme, page } = useData();

// Daily builds link back to the same page on the stable site.
const stablePageUrl = computed(() => {
  const path = page.value.relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
  return `${theme.value.stableUrl}/${path}`;
});

// Setup medium zoom with the desired options
const setupMediumZoom = () => {
  mediumZoom("[data-zoomable]", {
    background: "transparent",
  });
};

// Apply medium zoom on load
onMounted(setupMediumZoom);

// Subscribe to route changes to re-apply medium zoom effect
router.onAfterRouteChanged = setupMediumZoom;
</script>

<template>
  <Layout>
    <template v-if="theme.isDaily" #doc-before>
      <div class="custom-block warning daily-banner">
        <p class="custom-block-title">Daily documentation</p>
        <p>
          This page documents daily builds of Shoko and may describe features that aren't in the stable release.
          <a :href="stablePageUrl" target="_self">View this page in the stable docs</a>.
        </p>
      </div>
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>

<style>
.medium-zoom-overlay {
  backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>
