import { useState } from "react";

import DockerComposeInput from "../DockerComposeInput/DockerComposeInput";

const DockerCompose = () => {
  const [highlightedCode, setHighlightedCode] = useState(null);
  const [userInput, setUserInput] = useState({
    container: "shoko_server",
    puid: "$UID",
    pgid: "$GID",
    tz: "Etc/UTC",
    port: "8111",
    volumes: ["./shoko-config:/home/shoko/.shoko"],
  });

  const fieldLabels = {
    container: "Container",
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
      container_name: ${userInput.container}
      image: shokoanime/server:latest
      restart: always
      environment:
        - "PUID=${userInput.puid}"
        - "PGID=${userInput.pgid}"
        - "TZ=${userInput.tz}"
      ports:
        - "${userInput.port}:8111"
      volumes:
        ${userInput.volumes.map((volume) => `- "${volume}"`).join("\n        ")}`;

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
        <pre className="docker-output-codeblock">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default DockerCompose;
