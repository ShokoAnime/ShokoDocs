import { program, typeColor } from "./Changelog.utils.ts";
import type {
  BuildChangesProps,
  ChangeHeaderProps,
  ProgramResult,
  ReleaseInfo,
  VersionChange,
} from "./Changelog.interfaces.ts";

const Changelog = ({ name }: { name: any }) => {
  const releaseInfo: ReleaseInfo[] = (program(name) as ProgramResult[]).map(
    ({ changes, date, link, version, versionURL }) => {
      const groupedChanges = changes.reduce(
        (acc, { type, text }) => {
          (acc[type] = acc[type] || []).push({ text });
          return acc;
        },
        {} as Record<string, VersionChange[]>,
      );

      return {
        changes: { changes: groupedChanges },
        date,
        link,
        version,
        versionURL,
      };
    },
  );

  const ChangeHeader = ({
    date,
    version,
    link,
    versionURL,
  }: ChangeHeaderProps) => (
    <div className="changelog-info">
      <h3
        id={versionURL}
        style={{ margin: "0 !important", width: "0 !important" }}
      />
      <div className="changelog-version">Version {version}</div>
      {date !== "NA" && (
        <>
          <div className="changelog-divider">|</div>
          <div className="changelog-date">{date}</div>
        </>
      )}
      {link === "Dev" && (
        <>
          <div className="changelog-development">In Development</div>
        </>
      )}
      {link !== "Dev" && link !== "NA" && (
        <>
          <div className="changelog-divider">|</div>
          <a
            className="changelog-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Release Notes
          </a>
        </>
      )}
    </div>
  );

  const BuildChanges = ({ info }: BuildChangesProps) =>
    Object.entries(info.changes).map(([changeGroupKey, changeGroupList]) => (
      <div className="changelog-type-wrapper" key={changeGroupKey}>
        <div className={typeColor(changeGroupKey)}>
          {changeGroupKey} - {changeGroupList.length}{" "}
          {changeGroupList.length > 1 ? "Entries" : "Entry"}
        </div>
        <ul className="changelog-item-wrapper">
          {changeGroupList
            .reverse()
            .map(({ text }, index) => (
              <li
                className={`changelog-item changelog-${changeGroupKey}`}
                key={index}
              >
                {text}
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    ));

  return releaseInfo.map(
    ({ changes, date, link, version, versionURL }, index) => (
      <div className="changelog-wrapper" key={index}>
        <ChangeHeader
          date={date}
          version={version}
          link={link}
          versionURL={versionURL}
        />
        <BuildChanges info={changes} />
      </div>
    ),
  );
};

export default Changelog;
