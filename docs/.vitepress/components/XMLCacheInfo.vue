<template>
  <span>
    As of <strong>{{ date }}</strong> there are
    <strong>{{ fileCount }}</strong> files in the XML Cache.
  </span>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      fileCount: "",
    };
  },
  mounted() {
    this.fetchFileInfo();
  },
  methods: {
    async fetchFileInfo() {
      const fileUrl =
        "https://files.shokoanime.com/files/shoko-server/other/repo_info.txt";
      try {
        const response = await fetch(fileUrl);
        const fileContent = await response.text();
        const { date, fileCount } = this.formatFileInfo(fileContent);
        this.date = date;
        this.fileCount = fileCount;
      } catch (error) {
        console.error("Failed to fetch file:", error);
      }
    },
    formatFileInfo(fileContent) {
      const lines = fileContent.split("\n");
      const dateLine = lines[0];
      const filesLine = lines[1];

      const date = dateLine.split(": ")[1].split(" ")[0];
      const fileCount = parseInt(filesLine.split(": ")[1]).toLocaleString();

      return { date, fileCount };
    },
  },
};
</script>
