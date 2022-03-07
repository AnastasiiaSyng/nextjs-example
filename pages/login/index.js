import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Login() {
  const [token, setToken] = useState();
  const [url, setUrl] = useState();
  const [projectId, setProjectId] = useState(245);

  // useEffect(() => {
  //   axios
  //     .get("/api/v2/auth?current_url=http://localhost:3000/login")
  //     .then((data) => setUrl(data.data.okta));
  // }, []);

  const checkLogin = () => {
    axios
      .post("/api/v2/auth", { username: "admin", password: "FirstLogin" })
      .then((data) => setToken(data.data.token))
      .catch((e) => console.log(e, "error"));
  };

  const createProject = () => {
    axios
      .post(
        "/api/v2/projects",
        { caseName: "testProject2", description: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => setProjectId(data.data.id))
      .catch((e) => console.log(e, "error"));
  };

  const checkAmiImport = () => {
    axios
      .post(
        `/api/v2/projects/${projectId}/imports/ec2?`,
        {
          bucket: "",
          instance_id: "ami-0a935c709872fd626",
          region: "us-east-1",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => console.log(data))
      .catch((e) => console.log(e, "error"));
  };

  const checkAllEvidences = () => {
    axios
      .get(`/api/v2/projects/${projectId}/evidences`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => console.log(data, "all evidences"))
      .catch((e) => console.log(e, "error"));
  };

  const checkSSOwithoutHeader = () => {
    axios
      .put("/api/v2/settings/oauth", {
        provider: "okta",
        client_secret: "LmMBzpXEEHrPEdCoTHePa7swfMtdIUjW12pqrj8R",
        client_id: "0oa2jwwuc5ahS3YUb5d7",
        tenant_id: "https://dev-42409943.okta.com/oauth2",
        enabled: true,
      })
      .then((data) => console.log(data, "sso data"))
      .catch((e) => console.log(e, "error"));
  };

  const checkSSO = () => {
    axios
      .put(
        "/api/v2/settings/oauth",
        {
          provider: "okta",
          client_secret: "LmMBzpXEEHrPEdCoTHePa7swfMtdIUjW12pqrj8R",
          client_id: "0oa2jwwuc5ahS3YUb5d7",
          tenant_id: "https://dev-42409943.okta.com/oauth2",
          enabled: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => console.log(data, "sso data"))
      .catch((e) => console.log(e, "error"));
  };

  let params;

  if (typeof window !== "undefined") {
    params = new URLSearchParams(window.location.search);
  }

  const doOAuthLogin = () => {
    if (params.get("code") && params.get("state")) {
      axios
        .post("/api/v2/auth", {
          auth_code: params.get("code"),
          state: params.get("state"),
          current_url: window.location.href,
        })
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => checkLogin()}>Login</button>
      </div>
      <div>
        <button onClick={() => checkSSOwithoutHeader()}>
          make request withot token
        </button>
      </div>

      <div>
        <button onClick={() => checkSSO()}>Click checkSSO</button>
      </div>
      <div>
        <button onClick={() => createProject()}>Creat project</button>
      </div>
      <p>AMI stuff </p>
      <div>
        <button onClick={() => checkAmiImport()}>check AMI import</button>
      </div>
      <div>
        <button onClick={() => checkAllEvidences()}>Check all Evidences</button>
      </div>

      <p>OKTA stuff </p>
      <button onClick={() => window.open(url, "_self")}>
        <p>Sign in with OKTA</p>
      </button>
      <div>
        <button onClick={() => doOAuthLogin()}>Login with oauth</button>
      </div>
    </div>
  );
}
