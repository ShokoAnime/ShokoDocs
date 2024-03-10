import { program, typeColor } from "./Changelog.utils";

type versionChanges = {
  type: string;
  text: string;
};

type releaseInfo = {
  changes: Record<string, versionChanges[]>;
};

const Changelog = ({ name }) => {
  const releaseInfo = program(name).map(
    ({ changes, date, link, version, versionURL }) => {
      const groupedChanges = changes.reduce((acc, { type, text }) => {
        (acc[type] = acc[type] || []).push({ text });
        return acc;
      }, {});

      return { changes: groupedChanges, date, link, version, versionURL };
    },
  );

  const ChangeHeader = ({ date, version, link }) => (
    <div className="changelog-info">
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

  const BuildChanges = ({ info: { changes } }: { info: releaseInfo }) =>
    Object.entries(changes)
      .sort()
      .map(([changeGroupKey, changeGroupList]) => (
        <div className="changelog-type-wrapper" key={changeGroupKey}>
          <div className={typeColor(changeGroupKey)}>{changeGroupKey}</div>
          <ul className="changelog-item-wrapper">
            {changeGroupList
              .sort((a, b) => a.text.localeCompare(b.text))
              .map(({ text }, index) => (
                <li
                  className={`changelog-item changelog-${changeGroupKey}`}
                  key={index}
                >
                  {text}
                </li>
              ))}
          </ul>
        </div>
      ));

  return releaseInfo.map(
    ({ changes, date, link, version, versionURL }, index) => (
      <div className="changelog-wrapper" key={index} id={versionURL}>
        <ChangeHeader date={date} version={version} link={link} />
        <BuildChanges info={{ changes }} />
      </div>
    ),
  );
};

export default Changelog;
