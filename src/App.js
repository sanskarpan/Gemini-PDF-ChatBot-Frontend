import React, { useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setIsUploaded(true); // Show chat even if no file is uploaded
      return;
    };

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/api/v1/upload/document", formData);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const toggleUploadSection = () => {
    setIsUploadOpen(!isUploadOpen);
  };

  return (
    <div className="app-container">
      <div className="section-container">
        <div className="section-header" onClick={toggleUploadSection}>
          <h3>Upload documents</h3>
          <span>{isUploadOpen ? "-" : "+"}</span>
        </div>
        {isUploadOpen && (
          <div className="upload-container">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        )}
      </div>

      {/* Chat is always visible */}
      <Chat />
    </div>
  );
}

export default App;
