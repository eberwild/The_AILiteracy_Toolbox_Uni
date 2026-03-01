// ===============================
// IMPORTS
// ===============================

// Git wrapper to clone repositories
import simpleGit from "simple-git";

// execa allows us to run shell commands like npm, python, or docker
import { execa } from "execa";

// fetch to make HTTP requests
import fetch from "node-fetch";

// tmp creates safe temporary directories
import tmp from "tmp";

// fs-extra offers enhanced file system functions
import fs from "fs-extra";

// path helps to build cross-platform file paths
import path from "path"

// child_process for launching Python processes
import { spawn } from "child_process";

// ===============================
// MAIN FUNCTION
// ===============================

// This function tests whether a repo is startable / loadable
// It supports Frontend (React/Vite/HTML) and Python tools
export async function testToolRepo(repoUrl) {

  // ===============================
  // Step 1 ->  Create a temporary directory
  // ===============================

  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const projectPath = tmpDir.name;

  // Generate a random port for frontend testing
  const testPort = 5000 + Math.floor(Math.random() * 1000);

  // Unique container name for Docker/nginx
  const containerName = "tool-test-" + Date.now();

  try {

    // ===============================
    // Step 2 ->  Clone the repository
    // ===============================

    await simpleGit().clone(repoUrl, projectPath);

    // ===============================
    // Step 3 ->  Detect project type
    // ===============================

    const packageJsonPath = path.join(projectPath, "package.json");
    const requirementsPath = path.join(projectPath, "requirements.txt");
    const appPyPath = path.join(projectPath, "app.py");

    const hasPackageJson = await fs.pathExists(packageJsonPath);
    const hasRequirements = await fs.pathExists(requirementsPath);
    const hasAppPy = await fs.pathExists(appPyPath);

    // ===============================
    // Step 4 ->  Frontend (React/Vite) workflow
    // ===============================

    if (hasPackageJson) {

      // Install dependencies
      await execa("npm", ["install"], { cwd: projectPath });

      // Run build
      await execa("npm", ["run", "build"], { cwd: projectPath });

      // Determine build folder
      let staticFolder = projectPath;
      const distPath = path.join(projectPath, "dist");
      const buildPath = path.join(projectPath, "build");

      if (await fs.pathExists(distPath)) staticFolder = distPath;
      else if (await fs.pathExists(buildPath)) staticFolder = buildPath;

      // Start nginx container to serve static files
      await execa("docker", [
        "run",
        "-d",
        "-p", `${testPort}:80`,
        "--name", containerName,
        "--memory=128m",
        "--cpus=0.5",
        "-v", `${staticFolder}:/usr/share/nginx/html:ro`,
        "nginx:alpine"
      ]);

      // Wait a short time for nginx to start
      await new Promise(resolve => setTimeout(resolve, 3000));

      // HTTP test
      const response = await fetch(`http://localhost:${testPort}`);
      const success = response.ok;

      // Cleanup
      await execa("docker", ["rm", "-f", containerName]);
      tmpDir.removeCallback();

      return success;
    }

    // ===============================
    // Step 4 ->  Python workflow
    // ===============================

    else if (hasAppPy || hasRequirements) {
      // Create a simple Python Docker container to run the tool safely
      // Use official Python image, mount only the temp repo folder
      // Limit resources and auto-remove container after exit

      // use 'python:3.12-alpine' for minimal footprint
      const pyContainerName = `python-test-${Date.now()}`;

      // Compose docker run args
      const dockerArgs = [
        "run",
        "-d",                                 // detached
        "--name", pyContainerName,            // container name
        "--memory=128m",                      // RAM limit
        "--cpus=0.5",                         // CPU limit
        "-v", `${projectPath}:/usr/src/app:ro`, // mount repo read-only
        "-w", "/usr/src/app",                 // working directory inside container
        "python:3.12-alpine",                 // base image
        "python", hasAppPy ? "app.py" : "python" // run app.py or fallback
      ];

      // install dependencies if requirements exist
      if (hasRequirements) {
        await execa("docker", [
          "run",
          "--rm",
          "-v", `${projectPath}:/usr/src/app:ro`,
          "-w", "/usr/src/app",
          "python:3.12-alpine",
          "sh", "-c", "python -m pip install -r requirements.txt"
        ]);
      }

      // start the python container
      await execa("docker", dockerArgs);

      // wait a few seconds to ensure container started
      await new Promise(resolve => setTimeout(resolve, 5000));

      // check if container is still running
      const { stdout } = await execa("docker", ["ps", "-q", "-f", `name=${pyContainerName}`]);
      const success = stdout.trim() !== "";

      // cleanup container
      await execa("docker", ["rm", "-f", pyContainerName]);
      tmpDir.removeCallback();

      return success;
    }

    // ===============================
    // Step 5 ->  Plain HTML/JS workflow
    // ===============================

    else {
      // Use the root folder as static folder
      const staticFolder = projectPath;

      // Start nginx container to serve static files
      await execa("docker", [
        "run",
        "-d",
        "-p", `${testPort}:80`,
        "--name", containerName,
        "--memory=128m",
        "--cpus=0.5",
        "-v", `${staticFolder}:/usr/share/nginx/html:ro`,
        "nginx:alpine"
      ]);

      // Wait a short time for nginx to start
      await new Promise(resolve => setTimeout(resolve, 3000));

      // HTTP test
      const response = await fetch(`http://localhost:${testPort}`);
      const success = response.ok;

      // Cleanup
      await execa("docker", ["rm", "-f", containerName]);
      tmpDir.removeCallback();

      return success;
    }

  } catch (error) {

    console.error("Tool Repo Test Error:", error);

    try {
      await execa("docker", ["rm", "-f", containerName]);
    } catch {}

    tmpDir.removeCallback();

    return false;
  }
}