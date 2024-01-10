// Imports
import React from "react";
import Lodash from "lodash";
import { program, typeColor } from "./Changelog.utils";

export default function Changelog(props) {
  interface releaseInfo {
    changes: object;
    date: string;
    link: string;
    version: string;
    versionURL: string;
  }

  const releaseInfo = Lodash.map(
    program(props.name),
    ({ changes, date, link, version, versionURL }: releaseInfo) => {
      return {
        changes: Lodash.groupBy(changes, "type"),
        date: date,
        link: link,
        version: version,
        versionURL: versionURL,
      };
    },
  );

  const BuildChanges = (release) =>
    Lodash.map(release.info.changes, (changeGroupMap, changeGroupKey) => (
      <div className="changelog-type-wrapper" key={changeGroupKey}>
        <div className={typeColor(changeGroupKey)}>{changeGroupKey}</div>
        <ul className="changelog-item-wrapper">
          {Lodash.map(changeGroupMap, (changeItemMap, changeItemKey) => (
            <li className="changelog-item" key={changeItemKey}>
              - {changeItemMap.text}
            </li>
          ))}
        </ul>
      </div>
    ));

  return Lodash.map(releaseInfo, (info, infoKey) => (
    <div className="changelog-wrapper" key={infoKey} id={info.versionURL}>
      <div className="changelog-info">
        <div className="changelog-version">Version {info.version}</div>
        <div className="changelog-divider">|</div>
        <div className="changelog-date">{info.date}</div>
        {info.link !== "NA" ? (
          <>
            <div className="changelog-divider">|</div>
            <a className="changelog-link" href={info.link} target="_blank">
              View Release Notes
            </a>
          </>
        ) : null}
      </div>
      <div className="changelog-content">{BuildChanges({ info })}</div>
    </div>
  ));
}
