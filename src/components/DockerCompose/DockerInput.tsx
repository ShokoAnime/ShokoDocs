import React from "react";

interface DockerInputProps {
  userInput: {
    serviceName: string;
    containerName: string;
    puid: string;
    pgid: string;
    tz: string;
    port: string;
    volumes: string[];
  };
  setUserInput: (userInput: DockerInputProps["userInput"]) => void;
  inputField: keyof DockerInputProps["userInput"];
  textField: string;
}

const DockerInput = ({
  setUserInput,
  userInput,
  inputField,
  textField,
}: DockerInputProps) => {
  const handleVolumeChange = (index: number, value: string) => {
    const newVolumes = [...userInput.volumes];
    newVolumes[index] = value;
    setUserInput({
      ...userInput,
      volumes: newVolumes,
    });
  };

  const addVolume = () => {
    setUserInput({
      ...userInput,
      volumes: [...userInput.volumes, ""],
    });
  };

  const removeVolume = (index: number) => {
    const newVolumes = [...userInput.volumes];
    newVolumes.splice(index, 1);
    setUserInput({
      ...userInput,
      volumes: newVolumes,
    });
  };

  return (
    <div className="docker-input-wrapper">
      {inputField !== "volumes" ? (
        <>
          <div className="docker-input-text">{textField}:</div>
          <input
            className="docker-input-input"
            id={inputField}
            value={userInput[inputField]}
            onInput={(e) =>
              setUserInput({
                ...userInput,
                [inputField]: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
        </>
      ) : (
        <div className="docker-input-volume-wrapper">
          <div className="docker-input-volume-text">
            <div className="docker-input-text">{textField}:</div>
            <button className="docker-input-button " onClick={addVolume}>
              Add
            </button>
          </div>
          {userInput.volumes.map((volume, index) => (
            <div key={index} className="docker-input-volume-row">
              {index > 0 && (
                <button
                  className="docker-input-button "
                  onClick={() => removeVolume(index)}
                >
                  Delete
                </button>
              )}
              <input
                className="docker-input-input"
                value={volume}
                onInput={(e) =>
                  handleVolumeChange(
                    index,
                    (e.target as HTMLTextAreaElement).value,
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DockerInput;
