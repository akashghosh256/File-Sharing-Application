import { useRef, useState, useEffect } from "react";
import { uploadFileAPI } from "./services/api";
import "./styles/homepage.css";

function App() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [resultLink, setResultLink] = useState("Upload to Generate link");
  const linkInputRef = useRef(null);

  const fileInputRef = useRef();


  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
         // all it is managed by image controller
        data.append("name", file.name);
        data.append("size", file.size);
        data.append("file", file);

        try {
          let response = await uploadFileAPI(data);
          setResultLink(response.path);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    getImage();
  }, [file]);

  const onClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
  };
  const handleCopyLink = () => {
    const link = linkInputRef.current.value;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <div className="container text-center">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title mb-4">
              OneLink - Share Any Type of File or Media
            </h1>
            <p>
              {" "}
              whether it's an .exe, .ppt, .pdf, .doc, .txt, and more - without
              restrictions.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="form-control-file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={onClickUpload}
              >
                Upload File
              </button>
              <p>
                Selected File: {fileName} (Size:{" "}
                {Math.round((fileSize / (1024 * 1024)) * 100) / 100} MB)
              </p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={resultLink}
                  ref={linkInputRef}
                  readOnly
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleCopyLink}
                  >
                    Copy OneLink
                  </button>
                </div>
                <p className="text-muted">
                  Copy and paste the link in browser to download the
                  file.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
