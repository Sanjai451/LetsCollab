import React from "react";

interface CustomButtonProps {
  handleClickForButton: () => void;
  copied: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ handleClickForButton, copied }) => {
  return (
    <div>
      <button onClick={handleClickForButton}>
        <img src="https://img.icons8.com/?size=100&id=30&format=png&color=000000" alt="copy" />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default CustomButton;
