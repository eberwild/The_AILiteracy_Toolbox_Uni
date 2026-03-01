import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";
import fs from "fs-extra";
import tmp from "tmp";
import simpleGit from "simple-git";
import dotenv from "dotenv";

dotenv.config({path: "../.env.local"});

export async function testRepoRenderMulti(repoUrl) {

  const serviceName = `tool-test-${crypto.randomBytes(4).toString("hex")}`; 
  let serviceId = null;
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const projectPath = tmpDir.name;

  try {
    // Step 1 ->  Clone repo
    await simpleGit().clone(repoUrl, projectPath);

    const packageJsonPath = `${projectPath}/package.json`;
    const requirementsPath = `${projectPath}/requirements.txt`;
    const indexPath = `${projectPath}/index.html`;
    const appPyPath = `${projectPath}/app.py`;
    const mainPyPath = `${projectPath}/main.py`;

    let projectType = null;

    // ==========================
    // Step 2 ->  Strict Type Detection
    // ==========================

    // --- Plain HTML Project ---
    if (await fs.pathExists(indexPath)) {
      projectType = "plain";
    }

    // --- Node.js Backend ---
    if (await fs.pathExists(packageJsonPath)) {
      const pkg = await fs.readJson(packageJsonPath);

      if (!pkg.scripts || !pkg.scripts.start) {
        throw new Error("Node project missing start script");
      }

      projectType = "node";
    }

    // --- Python Flask ---
    if (await fs.pathExists(requirementsPath)) {

      if (!(await fs.pathExists(appPyPath)) && !(await fs.pathExists(mainPyPath))) {
        throw new Error("Python project missing app.py or main.py");
      }

      projectType = "python";
    }

    if (!projectType) {
      throw new Error("Repository does not match supported project types");
    }

    // ==========================
    // Step 3 ->  Prepare Render Payload
    // ==========================

    let renderPayload;

    if (projectType === "plain") {

      renderPayload = {
        name: serviceName,
        type: "static_site",
        repo: repoUrl,
        branch: "main",
        buildCommand: "",
        publishDirectory: ".",
        autoDeploy: false
      };

    } else if (projectType === "node") {

      renderPayload = {
        name: serviceName,
        type: "web_service",
        repo: repoUrl,
        branch: "main",
        buildCommand: "npm install",
        startCommand: "npm start",
        autoDeploy: false
      };

    } else if (projectType === "python") {

      const startFile = (await fs.pathExists(appPyPath)) ? "app.py" : "main.py";

      renderPayload = {
        name: serviceName,
        type: "web_service",
        repo: repoUrl,
        branch: "main",
        buildCommand: "pip install -r requirements.txt",
        startCommand: `python ${startFile}`,
        autoDeploy: false
      };
    }

    // ==========================
    // Step 4 ->  Create Render Service
    // ==========================

    const createResp = await axios.post(
      "https://api.render.com/v1/services",
      renderPayload,
      { headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` } }
    );

    if (!createResp.data?.id) {
      throw new Error("Render service creation failed");
    }

    serviceId = createResp.data.id;

    // ==========================
    // Step 5 ->  Poll for Live Status
    // ==========================

    let serviceUrl = null;
    let isLive = false;

    for (let i = 0; i < 30; i++) { // 150 seconds max
      await new Promise(r => setTimeout(r, 5000));

      const statusResp = await axios.get(
        `https://api.render.com/v1/services/${serviceId}`,
        { headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` } }
      );

      const state = statusResp.data.state;

      if (state === "live") {
        isLive = true;
        serviceUrl = statusResp.data.serviceDetails?.url 
                  || statusResp.data.service?.url;
        break;
      }

      if (state === "failed") {
        break;
      }
    }

    // ==============================
    // Step 6 ->  Test HTTP Response
    // ==============================

    let success = false;

    if (isLive && serviceUrl) {
      const resp = await fetch(serviceUrl);
      success = resp.ok;
    }

    // ==========================
    // Step 7 ->  Success/Fail
    // ==========================

    if(success){
      return {
        status: true
      }
    } else {
      return {
        status: false ,
        text: "Service could not go live or failed."
      }
    }
    
  // ==========================
  // Step 8 ->  Error Response
  // ==========================
  } catch (err) {
    console.error("Render Multi-Repo Test Error:", err.message);
    return {
      status: false ,
      text: err.message
    }
  // ==========================
  // Step 9 ->  Cleanup
  // ==========================
  } finally {
      if (serviceId) {
        try {
          await axios.delete(
            `https://api.render.com/v1/services/${serviceId}`,
            { headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` } }
          );
        } catch (cleanupErr) {
          console.error("Cleanup failed:", cleanupErr.message);
        }
    }

  tmpDir.removeCallback();
  }
}