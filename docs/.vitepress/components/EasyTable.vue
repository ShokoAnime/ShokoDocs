<template>
  <div class="easy-table-wrapper">
    <table class="easy-table">
      <thead>
        <tr>
          <th
            v-for="column in visibleColumns"
            :key="column.name"
            :style="{ width: column.width }"
          >
            {{ column.header || column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="column in visibleColumns" :key="column.name">
            <span v-html="renderCellContent(row[column.name])"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  name: "EasyTable",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((column) =>
        this.data.some((row) => column.name in row),
      );
    },
  },
  methods: {
    renderCellContent(content) {
      if (content === undefined) return "";

      if (typeof content === "object" && content !== null) {
        if (content.link && content.title) {
          return `<a href="${content.link}">${content.title}</a>`;
        }
        // Convert the object to a formatted JSON string and wrap it in a code block
        const jsonString = JSON.stringify(content, null, 2);
        return `<pre><code>${jsonString}</code></pre>`;
      }

      if (typeof content === "string") {
        if (content.startsWith("http")) {
          return `<a href="${content}">Link</a>`;
        }
        return marked.parse(content);
      }
      return content;
    },
  },
};
</script>

<style scoped>
.easy-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.easy-table {
  display: table;
  width: 100%;
}

.easy-table tr:last-child td {
  border-bottom: none;
}

.easy-table td > code {
  display: inline-block;
  overflow-x: auto;
  white-space: pre;
  max-width: 100%;
}
</style>
