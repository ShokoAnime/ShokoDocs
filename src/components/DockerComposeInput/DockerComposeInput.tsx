import React from "react";

// Interfaces
interface UserInput {
  container: string;
  puid: string;
  pgid: string;
  tz: string;
  port: string;
  volumes: string[];
}

interface DockerInputProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  inputField: string;
  textField: string;
}

interface VolumeInputProps {
  volume: string;
  index: number;
  onVolumeChange: (index: number, value: string) => void;
  onRemoveVolume: (index: number) => void;
}

// VolumeInput Component
interface VolumeInputProps {
  volume: string;
  index: number;
  onVolumeChange: (index: number, value: string) => void;
  onRemoveVolume: (index: number) => void;
}

const VolumeInput = React.memo(
  ({ volume, index, onVolumeChange, onRemoveVolume }: VolumeInputProps) => (
    <div className="docker-input-volume-row">
      {index > 0 && (
        <button
          className="docker-input-button"
          type="button"
          onClick={() => onRemoveVolume(index)}
        >
          Delete
        </button>
      )}
      <input
        className="docker-input-input"
        value={volume}
        onChange={(e) => onVolumeChange(index, e.target.value)}
      />
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.volume === nextProps.volume &&
    prevProps.index === nextProps.index,
);

// DockerComposeInput Component
const DockerComposeInput = ({
  userInput,
  setUserInput,
  inputField,
  textField,
}: DockerInputProps): JSX.Element => {
  const handleVolumeChange = (index: number, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      volumes: prev.volumes.map((v, i) => (i === index ? value : v)),
    }));
  };

  const addVolume = () =>
    setUserInput((prev) => ({
      ...prev,
      volumes: [...prev.volumes, ""],
    }));

  const removeVolume = (index: number) =>
    setUserInput((prev) => ({
      ...prev,
      volumes: prev.volumes.filter((_, i) => i !== index),
    }));

  return (
    <div className="docker-input-wrapper">
      {inputField !== "volumes" ? (
        <>
          <div className="docker-input-text">{textField}:</div>
          <input
            className="docker-input-input"
            id={inputField}
            value={userInput[inputField]}
            onChange={(e) =>
              setUserInput({ ...userInput, [inputField]: e.target.value })
            }
          />
        </>
      ) : (
        <div className="docker-input-volume-wrapper">
          <div className="docker-input-volume-text">
            <div className="docker-input-text">{textField}:</div>
            <button className="docker-input-button" onClick={addVolume}>
              Add
            </button>
          </div>
          {userInput.volumes.map((volume, index) => (
            <VolumeInput
              key={index}
              volume={volume}
              index={index}
              onVolumeChange={handleVolumeChange}
              onRemoveVolume={removeVolume}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DockerComposeInput;
