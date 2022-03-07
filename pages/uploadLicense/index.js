import axios from "axios";
import React, { useState } from "react";

export default function Hi() {
  const [token, setToken] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const onFileChange = (fileUploaded) => {
    setSelectedFile(fileUploaded);
  };

  const checkLogin = () => {
    axios
      .post("/api/v2/auth", { username: "admin", password: "FirstLogin" })
      .then((data) => setToken(data.data.token))
      .catch((e) => console.log(e, "error"));
  };

  const onFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post("/api/v2/license", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => console.log(data, "license data"))
        .catch((e) => console.log(e, "error"));
    }
  };

  return (
    <div>
      <p>HI this is hi page</p>
      <div>
        <button onClick={() => checkLogin()}>Click get Token</button>
      </div>

      <FileUploader onFileChange={onFileChange} />
      <div>
        <button onClick={() => onFileUpload()}>Step 2 license</button>
      </div>
    </div>
  );
}

const FileUploader = ({ onFileChange }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    if (null !== hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (e) => {
    if (
      null !== e.target.files &&
      e.target.files[0].type === "application/json"
    ) {
      const fileUploaded = e.target.files[0];
      onFileChange(fileUploaded);
    }
    e.currentTarget.value = "";
  };

  return (
    <div>
      <button onClick={() => handleClick()}> 1 license uploadfile</button>
      <input
        className="data-test-select-license-button"
        type="file"
        accept="application/json"
        ref={hiddenFileInput}
        onChange={(e) => handleChange(e)}
        style={{ display: "none" }}
      />
    </div>
  );
};
