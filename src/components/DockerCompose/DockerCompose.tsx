import React, { useEffect, useState } from "react";
import * as shiki from "shiki";
import DockerInput from "@components/DockerCompose/DockerInput.tsx";
shiki.setCDN("https://unpkg.com/shiki/");

const DockerCompose = () => {
  const [highlightedCode, setHighlightedCode] = useState(null);
  const [userInput, setUserInput] = useState({
    serviceName: "shoko_server",
    containerName: "shoko_server",
    puid: "$UID",
    pgid: "$GID",
    tz: "Etc/UTC",
    port: "8111",
    volumes: ["./shoko-config:/home/shoko/.shoko"],
  });

  const code = `  version: "3"
    services:
    ${userInput.serviceName}:
      shm_size: 256m
      container_name: ${userInput.containerName}
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
        <DockerInput
          userInput={userInput}
          setUserInput={setUserInput}
          inputField="puid"
          textField="PUID"
        />
        <hr className="docker-input-hr" />
        <DockerInput
          userInput={userInput}
          setUserInput={setUserInput}
          inputField="pgid"
          textField="PGID"
        />
        <hr className="docker-input-hr" />
        <DockerInput
          userInput={userInput}
          setUserInput={setUserInput}
          inputField="tz"
          textField="Time Zone"
        />
        <hr className="docker-input-hr" />
        <DockerInput
          userInput={userInput}
          setUserInput={setUserInput}
          inputField="port"
          textField="Port"
        />
        <hr className="docker-input-hr" />
        <DockerInput
          userInput={userInput}
          setUserInput={setUserInput}
          inputField="volumes"
          textField="Volumes"
        />
      </div>
      <div className="expressive-code">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </div>
    </div>
  );
};

export default DockerCompose;
