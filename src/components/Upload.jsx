import React, { useState, useRef } from "react";
import "./upload.css";

function Upload({ onFileChange }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      onFileChange(uploadedFile);
    } else {
      setFile(null);
      onFileChange(null);
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Simulating a click on the file input
  };

  return (
    <div className="input-wrapper">
      <div className="input-content-wrapper">
        <h2>Börja med att ladda upp din bild</h2>
        <button className="custom-upload-btn" onClick={handleButtonClick}>
          Välj Bild
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Upload;