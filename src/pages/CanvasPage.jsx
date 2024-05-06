import React, { useState } from "react";
import Canvas from "../components/Canvas";
import Upload from "../components/Upload";
import Header from "../components/Header";
import "./canvaspage.css";

function CanvasPage() {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  const handleFileChange = (uploadedFile) => {
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      setImage(uploadedFile);
    } else {
      setFile(null);
      setImage(null);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setImage(null);
  }

  return (
    <>
      <Header />
      <div className="canvas-page-wrapper">
        <div className="main">
          {(!file) ? <Upload onFileChange={handleFileChange} /> :
           <Canvas file={file} image={image} onCancel={handleCancel} />}
        </div>
      </div>
    </>
  );
}

export default CanvasPage;