<template>
  <div class="changelog">
    <div v-for="release in releases" :key="release.version" class="release">
      <div class="release-header">
        <div>
          <h2 style="width: 0;" :id="`version-${release.version}`">
            <span style="display: none;">Ver {{ release.version }}</span>
            <span style="display: none;"> - </span>
            <span style="display: none;">{{ release.date }}</span>
          </h2>
          <span class="release-version">Version {{ release.version }}</span>
        </div>

        <span :class="release.date !== 'In Development' ? 'release-date' : 'release-dev'">
          <template v-if="release.date === 'In Development'">
            <strong>In Development</strong>
          </template>
          <template v-else>
            {{ release.date }}
          </template>

          <span v-if="release.link !== 'NA'"> |
            <a :href="release.link" target="_blank" rel="noopener noreferrer nofollow">View Release Notes</a>
          </span>
        </span>
      </div>

      <!-- Changes grouped by type and sorted by priority -->
      <div
        v-for="type in sortedChangeTypes(release.groupedChanges)"
        :key="type"
        :class="['change-group', type]"
      >
        <div class="change-group-header">
          <h3>{{ capitalizeType(type) }}</h3>
          <span class="change-group-count">
            {{ release.groupedChanges[type].length }} {{ release.groupedChanges[type].length === 1 ? 'Entry' : 'Entries' }}
          </span>
        </div>
        <ul>
          <li v-for="change in release.groupedChanges[type]" :key="change.text">{{ change.text }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import server from '../data/changelog/server.json'
import desktop from '../data/changelog/desktop.json'
import myanime3 from '../data/changelog/myanime3.json'
import shokofin from '../data/changelog/shokofin.json'
import shokometadata from '../data/changelog/shokometadata.json'
import shokorelay from '../data/changelog/shokorelay.json'
import webui from '../data/changelog/webui.json'

export default {
  name: 'Changelog',
  props: {
    filename: {
      type: String,
      required: true
    },
    displayOrder: {
      type: Array,
      default: () => ['breaking', 'added', 'changed', 'fixed', 'removed'],
      validator: (value) => Array.isArray(value) && value.length > 0
    }
  },
  setup(props) {
    const changelogMap = {
      'shokoServer': server,
      'shokoDesktop': desktop,
      'myAnime3': myanime3,
      'shokofin': shokofin,
      'shokoMetadata': shokometadata,
      'shokoRelay': shokorelay,
      'shokoWebUI': webui
    }

    const changelogData = computed(() => {
      const key = props.filename
      return changelogMap[key] || null
    })

    const githubLink = computed(() => changelogData.value?.githubLink || '')

    const releases = computed(() => {
      if (!changelogData.value) return []

      return changelogData.value.releases.slice(0, 15).map(release => ({
        ...release,
        groupedChanges: release.changes.reduce((acc, change) => {
          if (!acc[change.type]) {
            acc[change.type] = []
          }
          acc[change.type].push(change)
          return acc
        }, {})
      }))
    })

    // Function to sort change types based on displayOrder prop
    const sortedChangeTypes = (groupedChanges) => {
      const availableTypes = Object.keys(groupedChanges)
      return props.displayOrder.filter(type => availableTypes.includes(type))
    }

    const capitalizeType = (type) => {
      return type.charAt(0).toUpperCase() + type.slice(1)
    }

    return {
      changelogData,
      githubLink,
      releases,
      capitalizeType,
      sortedChangeTypes
    }
  }
}
</script>

<style scoped>
.changelog {
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
}

.release {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.release-header {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}

.release-header h2 {
  margin: 0;
  border: none;
  padding: 0;
}

.release-version {
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  font-weight: 600;
}

.release-date {
  font-size: 1rem;
  font-weight: 500;
}

.release-dev {
  font-size: 1rem;
}

.change-group {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.change-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.change-group-count {
  opacity: .75;
}

.change-group h3 {
  margin-top: 0;
}

.change-group ul {
  list-style: disc;
  padding-left: 1rem;
  margin-bottom: 0;
}

.change-group.added li::marker {
  color: #23AFD0;
}

.change-group.breaking li::marker {
  color: #e17509;
}

.change-group.changed li::marker {
  color: #33B074;
}

.change-group.fixed li::marker {
  color: #FFD60A;
}

.change-group.removed li::marker {
  color: #EC5D5E;
}
</style>