// Imports
import server from "../../assets/data/changelog/server.json";
import serverWebUI from "../../assets/data/changelog/webui.json";
import desktop from "../../assets/data/changelog/desktop.json";
import shokofin from "../../assets/data/changelog/shokofin.json";
import shokoMetadata from "../../assets/data/changelog/shokometadata.json";
import myAnime3 from "../../assets/data/changelog/myanime3.json";

export const program = (programName) => {
  switch (programName) {
    case "Shoko Server":
      return server.releases;
    case "Shoko WebUI":
      return serverWebUI.releases;
    case "Shoko Desktop":
      return desktop.releases;
    case "Shoko Metadata":
      return shokoMetadata.releases;
    case "Shokofin":
      return shokofin.releases;
    case "My Anime 3":
      return myAnime3.releases;
  }
};

export const typeColor = (type) => {
  switch (type) {
    case "added":
      return "changelog-type changelog-added";
    case "changed":
      return "changelog-type changelog-changed";
    case "fixed":
      return "changelog-type changelog-fixed";
    case "removed":
      return "changelog-type changelog-removed";
  }
};
