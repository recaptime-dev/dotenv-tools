import { cp, copyFile } from "node:fs/promises";
import * as fs from "node:fs";
import path from "node:path";
import git from "npm:isomorphic-git";
import { fileURLToPath } from "node:url";
import { logger } from "../lib/logging.ts";

/**
 * Path to template directory for cross-compat chaos
 *
 * @type {string}
 */
const templatePath = fileURLToPath(
  path.join(import.meta.url, "../../template")
);
/**
 * Current working directory based on `Deno.cwd()`.
 *
 * @type {string}
 */
const pwd = Deno.cwd()

/**
 * Check if a file exists or not
 *
 * @param {string} file
 * @returns {boolean}
 */
function checkIfExists(file) {
  if (!fs.existsSync(file)) {
    logger.debug(`${pwd}/${file} doesn't exist`);
    return false;
  }
  logger.debug(`${pwd}/${file} exist`);
  return true;
}

/**
 * Copy or overwrite a file from the template directory.
 *
 * @async
 * @param {string} file Path to file from the template directory
 * @param {boolean|null} override Whenever to overwrite the file or not
 * @returns {*}
 */
async function copyOrOverride(file: string, override?: boolean) {
  if (!checkIfExists(file)) {
    logger.info(`copying ${templatePath}/${file} to ${pwd}`);
    await copyFile(
      `${templatePath}/${file}`,
      `${pwd}/${file}`,
      fs.constants.COPYFILE_EXCL
    );
  } else if (override == true) {
    logger.info(
      `ovewriting ${pwd}/${file} with contents of ${templatePath}/${file}`
    );
    await copyFile(`${templatePath}/${file}`, `${pwd}/${file}`);
  }
  logger.info(`skipping copying ${file}`);
}

/**
 * Main function for the `setup|init` command in CLI.
 *
 * @export
 * @async
 * @param {string} directory
 * @returns {*}
 */
export async function setupRepo(directory: string) {
  logger.debug(`directory: ${directory}`);
  const options = this.opts();
  logger.debug(`options: ${JSON.stringify(options)}`);

  if (!directory) {
    if (!options.copyMissing && !options.overwrite) {
      logger.warn(
        "you can't use this command without adding `--copy-missing` or `--overwrite` flag in this directory"
      );
      Deno.exit(1);
    } else if (options.copyMissing || options.override) {
      await copyOrOverride(".env", options.overwrite);
      await copyOrOverride(".env.ci", options.overwrite);
      await copyOrOverride("README.md", options.overwrite);
      await copyOrOverride(".gitignore", options.overwrite);
    }
  } else if (directory) {
    logger.info(`copying template files to ${pwd}/${directory}`);
    await cp(templatePath, `${pwd}/${directory}`, {
      recursive: true,
      force: options.overwrite || false,
    });
  }
  git
    .init({ fs, dir: directory, defaultBranch: "main" })
    .then(logger.success(`successfully initialized git repo`));
}
