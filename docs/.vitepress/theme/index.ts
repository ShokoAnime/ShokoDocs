// @ts-nocheck
// https://vitepress.dev/guide/custom-theme
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Changelog from "../components/Changelog.vue";
import DockerCompose from "../components/DockerCompose.vue";
import EasyTable from "../components/EasyTable.vue";
import Features from "../components/Features.vue";
import Steps from "../components/Steps.vue";
import XMLCacheInfo from "../components/XMLCacheInfo.vue";
import Layout from "./Layout.vue";
import "./style.css";

import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component("EasyTable", EasyTable);
    app.component("DockerCompose", DockerCompose);
    app.component("Steps", Steps);
    app.component("Features", Features);
    app.component("Changelog", Changelog);
    app.component("XMLCacheInfo", XMLCacheInfo);
    app.use(NolebaseGitChangelogPlugin);
  },
} satisfies Theme;
