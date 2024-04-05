import server from "../../assets/data/changelog/server.json";
import serverWebUI from "../../assets/data/changelog/webui.json";
import desktop from "../../assets/data/changelog/desktop.json";
import shokofin from "../../assets/data/changelog/shokofin.json";
import shokorelay from "../../assets/data/changelog/shokorelay.json";
import shokoMetadata from "../../assets/data/changelog/shokometadata.json";
import myAnime3 from "../../assets/data/changelog/myanime3.json";

type ProgramName =
  | "Shoko Server"
  | "Shoko WebUI"
  | "Shoko Desktop"
  | "Shoko Metadata"
  | "Shokofin"
  | "ShokoRelay"
  | "My Anime 3";

export const program = (programName: ProgramName) => {
  const programMap: { [key in ProgramName]?: any } = {
    "Shoko Server": server.releases,
    "Shoko WebUI": serverWebUI.releases,
    "Shoko Desktop": desktop.releases,
    "Shoko Metadata": shokoMetadata.releases,
    Shokofin: shokofin.releases,
    ShokoRelay: shokorelay.releases,
    "My Anime 3": myAnime3.releases,
  };

  return programMap[programName] || [];
};

type ChangeType = "added" | "changed" | "fixed" | "removed" | string;

export const typeColor = (type: ChangeType) => {
  const typeMap: { [key in ChangeType]: string } = {
    added: "changelog-type changelog-added",
    changed: "changelog-type changelog-changed",
    fixed: "changelog-type changelog-fixed",
    removed: "changelog-type changelog-removed",
  };

  return typeMap[type] || "changelog-type";
};
