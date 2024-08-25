import * as childProceess from "node:child_process"
import { logger } from "../logging.ts";

/* 
 * The dotenvx CLI prefix
*/
let dotenvxCliPrefix = `dotenvx`

type cliOpts = {
  all?: boolean,
  prettyPrint?: boolean
  env: Array<string>,
  envFile: Array<string> | string,
  envVaultFile?: Array<string>,
  convention?: string,
  overload?: boolean,
  plain: boolean,
  encrypt: boolean,
  excludeKey?: Array<string>,
  stdout: boolean
}

function getSecret(key: string) {
  dotenvxCliPrefix += " get";
  logger.debug(`key: ${key}`);
  // @ts-expect-error: commander usage
  const options: cliOpts = this.opts();
  logger.debug(`opts: ${JSON.stringify(options)}`);

  // I know this is spaghetti code, but at least this works. I may
  // improve this later on.
  if (options.all == true) {
    dotenvxCliPrefix += " --all";
  }
  if (options.prettyPrint == true) {
    dotenvxCliPrefix += " --pretty-print";
  }
  if (options.overload == true) {
    dotenvxCliPrefix += " --overload";
  }
  if (options.env.length > 0) {
    options.env.forEach((env) => {
      dotenvxCliPrefix += ` --env=${env}`;
    });
  }
  if (Array.isArray(options.envFile) && options.envFile.length > 0) {
    options.envFile.forEach((envFile: string) => {
      dotenvxCliPrefix += ` --env-file=${envFile}`;
    });
  }
  if (Array.isArray(options.envVaultFile) && options.envVaultFile.length > 0) {
    options.envVaultFile.forEach((envVaultFile: string) => {
      dotenvxCliPrefix += ` --env-vault-file=${envVaultFile}`;
    });
  }
  if (options.convention == "nextjs") {
    dotenvxCliPrefix += ` --convention=nextjs`;
  } else {
    logger.successv(
      `convention flag only supports nextjs at upstream, skipping passing convention flag`
    );
  }

  if (key != undefined) {
    dotenvxCliPrefix += ` ${key}`;
  }

  logger.info(`executing [${dotenvxCliPrefix}]`);
  try {
    const result = childProceess
      .execSync(dotenvxCliPrefix, {
        env: Deno.env.toObject(),
        stdio: "pipe",
      })
      .toString();
    logger.blank(result);
  } catch (error) {
    logger.error(error.message);
    Deno.exit(1);
  }
}

function setSecret(key: string, value: string) {
  if (key == undefined || value == undefined) {
    logger.error("either secret name or value is blank");
    Deno.exit(1);
  }
  // @ts-expect-error: commander usage
  const options: cliOpts = this.opts();
  dotenvxCliPrefix += ` set --env-file=${options.envFile}`;
  logger.debug(`key: ${key}, value: ${value}`);
  logger.debug(`opts: ${JSON.stringify(options)}`);

  if (options.plain == true) {
    dotenvxCliPrefix += ` --plain`;
  }

  dotenvxCliPrefix += ` ${key} ${value}`;
  logger.info(`executing [${dotenvxCliPrefix}]`);
  try {
    const result = childProceess
      .execSync(dotenvxCliPrefix, {
        env: Deno.env.toObject(),
        stdio: "pipe",
      })
      .toString();
    logger.blank(result);
  } catch (error) {
    logger.error(error.message);
    Deno.exit(1);
  }
}

function loadSecretsAndExec() {
  // @ts-expect-error: commander usage
  const commandArgs: Array<string> = this.args;
  dotenvxCliPrefix += " run";
  logger.debug(`process command [${commandArgs.join(" ")}]`);
  // @ts-expect-error: commander usage
  const options: cliOpts = this.opts();
  logger.debug(`options: ${JSON.stringify(options)}`);

  if (commandArgs.length === 0) {
    logger.error(`missing command after [dotenv-tools dotenvx run --]`);
    logger.help2(`try: [dotenv-tools dotenvx run -- npm run dev]`);
    Deno.exit(1);
  }
  if (options.env.length > 0) {
    options.env.forEach((env) => {
      dotenvxCliPrefix += ` --env=${env}`;
    });
  }
  if (Array.isArray(options.envFile) && options.envFile.length > 0) {
    options.envFile?.forEach((envFile: string) => {
      dotenvxCliPrefix += ` --env-file=${envFile}`;
    });
  }
  if (Array.isArray(options.envVaultFile) && options.envVaultFile.length > 0) {
    options.envVaultFile.forEach((envVaultFile: string) => {
      dotenvxCliPrefix += ` --env-vault-file=${envVaultFile}`;
    });
  }
  dotenvxCliPrefix += ` -- ${commandArgs.join(" ")}`;
  logger.info(`executing [${dotenvxCliPrefix}] to load secrets and exec`);
  try {
    const result = childProceess
      .execSync(dotenvxCliPrefix, {
        env: Deno.env.toObject(),
        stdio: "pipe",
      })
      .toString();
    logger.blank(result);
  } catch (error) {
    logger.error(error.message);
    Deno.exit(1);
  }
}

function encryptSecrets() {
  const options: cliOpts = this.opts();
  logger.debug(`options: ${JSON.stringify(options)}`);
}

function decryptSecrets() {
  const options: cliOpts = this.opts();
  logger.debug(`options: ${JSON.stringify(options)}`);
}

export {
  getSecret,
  setSecret,
  loadSecretsAndExec,
  encryptSecrets,
  decryptSecrets
}