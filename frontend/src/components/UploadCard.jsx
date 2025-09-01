import axios from "axios";
import { useRef } from "react";

export default function UploadCard({ setLoading, setQuestions }) {
  const fileInputRef = useRef(null);

  async function uploadFile(e) {
    setLoading(true);
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    console.log(data);
    setLoading(false);
    setQuestions(data.response);
  }
  return (
    <div className="upload-card">
      <h3>Please Upload your Resume</h3>
      <div className="container">
        <form onSubmit={uploadFile}>
          <div className="input-grp">
            <input
              type="file"
              name="uploadFile"
              accept=".pdf,.doc, .docx"
              id="fileInput"
              ref={fileInputRef}
              required
            ></input>
          </div>
          <button className="submit-btn" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
