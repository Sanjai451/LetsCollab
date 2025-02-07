import React from "react";

interface OptionProps {
  lang?: {
    language?: string;
    name?: string;
  };
  index?: number;
}

const Options: React.FC<OptionProps> = ({ lang, index }) => {
  if (!lang || typeof lang !== "object") {
    return null; // Prevent rendering if lang is invalid
  }

  return (
    <>
      <option key={index}  value={lang.language || ""}>
        {lang.name || "Unknown"}
      </option>
    </>
   
  );
};

export default Options;
