import React from "react";
import mediumZoom from "medium-zoom";

interface ImageProps {
  title: string;
  source: string;
}

const Image = ({ title, source }: ImageProps) => {
  const handleClick = () => {
    console.log("Test");
    mediumZoom(".image-source");
  };

  return (
    <div className="image-wrapper">
      <div
        className="image-overlay"
        style={{ backgroundImage: `url(${source})` }}
        onClick={handleClick}
      />
      <img className="image-source" src={source} alt={title} />
      <div className="image-text">
        <div className="image-title">{title}</div>
        <div style={{ margin: 0 }}>Click to Enlarge</div>
      </div>
    </div>
  );
};

export default Image;
