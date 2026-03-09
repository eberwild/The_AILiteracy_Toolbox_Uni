import simpleGit from "simple-git";
import fs from "fs-extra";
import tmp from "tmp";
import crypto from "crypto";

/**
 * Test if a GitHub repo contains the necessary files
 * to match one of the 3 supported project types:
 * 1) Plain Web Project (HTML/JS/CSS)
 * 2) Node.js Project (React/Vite or JS backend)
 * 3) Python Project (Flask/FastAPI)
 *
 * @param {string} repoUrl - Public GitHub repository URL
 * @returns {Promise<{status: boolean, text?: string}>}
 */
export async function testRepoStructure(repoUrl) {
  // Create a temporary folder for cloning
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const projectPath = tmpDir.name;

  try {
    // Step 1 -> Clone the repo
    await simpleGit().clone(repoUrl, projectPath);

    // Step 2 -> Define paths to check
    const indexPath = `${projectPath}/index.html`;
    const packageJsonPath = `${projectPath}/package.json`;
    const requirementsPath = `${projectPath}/requirements.txt`;
    const appPyPath = `${projectPath}/app.py`;
    const mainPyPath = `${projectPath}/main.py`;

    let projectType = null;

    // Plain Web Project
    if (await fs.pathExists(indexPath)) {
      projectType = "plain";
    }

    // Node.js Project
    if (await fs.pathExists(packageJsonPath)) {
      const pkg = await fs.readJson(packageJsonPath);
      if (!pkg.scripts || !pkg.scripts.start) {
        return { status: false, text: "Node project missing a start script" };
      }
      projectType = "node";
    }

    // Python Project
    if (await fs.pathExists(requirementsPath)) {
      if (!(await fs.pathExists(appPyPath)) && !(await fs.pathExists(mainPyPath))) {
        return { status: false, text: "Python project missing app.py or main.py" };
      }
      projectType = "python";
    }

    // --------------------------
    // If none matched
    if (!projectType) {
      return { status: false, text: "Repository does not match any supported project type" };
    }

    // Repo passed all checks
    return { status: true, text: `Repo is a valid ${projectType} project` };

  } catch (err) {
    console.error("Repo Structure Test Error:", err.message);
    return { status: false, text: err.message };

  } finally {
    // clean up
    tmpDir.removeCallback();
  }
}