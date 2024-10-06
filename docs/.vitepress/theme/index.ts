// @ts-nocheck
// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from "./Layout.vue";
import './style.css'
import EasyTable from '../components/EasyTable.vue'
import DockerCompose from '../components/DockerCompose.vue'
import Steps from '../components/Steps.vue'
import Features from '../components/Features.vue'
import Changelog from '../components/Changelog.vue'
import XMLCacheInfo from '../components/XMLCacheInfo.vue'

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({app, router, siteData}) {
        app.component('EasyTable', EasyTable);
        app.component('DockerCompose', DockerCompose);
        app.component('Steps', Steps);
        app.component('Features', Features);
        app.component('Changelog', Changelog);
        app.component('XMLCacheInfo', XMLCacheInfo);
    }
} satisfies Theme
