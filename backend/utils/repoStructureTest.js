import simpleGit from "simple-git";
import fs from "fs-extra";
import tmp from "tmp";
import path from "path";

export async function testRepoStructure(repoUrl) {

  // 🔒 Basic Security: nur GitHub erlauben
  const gitRegex = /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+(\/.*)?$/;
  if (!gitRegex.test(repoUrl)) {
    return { status: false, text: "Only GitHub repositories are allowed." };
  }

  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const projectPath = tmpDir.name;

  try {
    // ⚡ Shallow Clone für Performance
    await simpleGit().clone(repoUrl, projectPath, ["--depth", "1"]);

    // 📁 Pfade sauber bauen
    const indexPath = path.join(projectPath, "index.html");
    const packageJsonPath = path.join(projectPath, "package.json");
    const requirementsPath = path.join(projectPath, "requirements.txt");
    const pyprojectPath = path.join(projectPath, "pyproject.toml");
    const appPyPath = path.join(projectPath, "app.py");
    const mainPyPath = path.join(projectPath, "main.py");

    let projectType = null;

    // --------------------------
    // check if repo is a node application
    if (await fs.pathExists(packageJsonPath)) {
      const pkg = await fs.readJson(packageJsonPath);

      if (!pkg.scripts || (!pkg.scripts.start && !pkg.scripts.dev)) {
        return {
          status: false,
          text: "Node project missing start or dev script"
        };
      }

      projectType = "node";
    }

    // --------------------------
    // check if repo is a python application
    else if (
      (await fs.pathExists(requirementsPath)) ||
      (await fs.pathExists(pyprojectPath))
    ) {
      const hasEntry =
        (await fs.pathExists(appPyPath)) ||
        (await fs.pathExists(mainPyPath));

      if (!hasEntry) {
        return {
          status: false,
          text: "Python project missing app.py or main.py"
        };
      }

      projectType = "python";
    }

    // --------------------------
    // check if repo is a plain web application
    else if (await fs.pathExists(indexPath)) {
      projectType = "plain";
    }

    // --------------------------
    // no valid projecttype found
    if (!projectType) {
      return {
        status: false,
        text: "Repository does not match any supported project type"
      };
    }

    return {
      status: true,
      text: `Repo is a valid ${projectType} project`
    };

  } catch (err) {
    console.error("Repo Structure Test Error:", err.message);

    return {
      status: false,
      text: "Repository could not be cloned or is invalid."
    };

  } finally {
    tmpDir.removeCallback();
  }
}