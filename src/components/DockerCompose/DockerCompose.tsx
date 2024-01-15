import React, { useEffect, useState } from "react";
import * as shiki from "shiki";
import DockerComposeInput from "@components/DockerComposeInput/DockerComposeInput.tsx";
shiki.setCDN("https://unpkg.com/shiki/");

const DockerCompose = () => {
  const [highlightedCode, setHighlightedCode] = useState(null);
  const [userInput, setUserInput] = useState({
    puid: "$UID",
    pgid: "$GID",
    tz: "Etc/UTC",
    port: "8111",
    volumes: ["./shoko-config:/home/shoko/.shoko"],
  });

  const fieldLabels = {
    puid: "PUID",
    pgid: "PGID",
    tz: "Time Zone",
    port: "Port",
    volumes: "Volumes",
  };

  const code = `  version: "3"
    services:
    shoko_server:
      shm_size: 256m
      container_name: shoko_server
      image: shokoanime/server:latest
      restart: always
      environment:
        - "PUID=${userInput.puid}"
        - "PGID=${userInput.pgid}"
        - "TZ=${userInput.tz}"
      ports:
        - "${userInput.port}:8111"
      volumes:
        ${userInput.volumes.map((volume) => `- ${volume}`).join("\n        ")}`;

  useEffect(() => {
    shiki
      .getHighlighter({ theme: "dracula-soft", langs: ["yaml"] })
      .then((highlighter) => {
        setHighlightedCode(highlighter.codeToHtml(code, { lang: "yaml" }));
      })
      .catch((reason) => {
        console.error("Error in syntax highlighting:", reason);
      });
  }, [code]);

  return (
    <div>
      <div className="docker-compose-wrapper">
        {Object.keys(userInput).map((key) => (
          <>
            <DockerComposeInput
              key={key}
              userInput={userInput}
              setUserInput={setUserInput}
              inputField={key}
              textField={fieldLabels[key] || key}
            />
            <hr className="docker-input-hr" />
          </>
        ))}
      </div>
      <div className="expressive-code not-content">
        <code
          className="docker-compose-code"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
};

export default DockerCompose;
