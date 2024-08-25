import { Command } from "npm:commander"
import { getSecret, loadSecretsAndExec, setSecret } from "../lib/helpers/dotenvxCli.ts";
export const dotenvxCli = new Command("dotenvx")

// for use with run
const envs: { type: any; value: any; }[] = []
//@ts-expect-error
function collectEnvs (type) {
  return function (value: any, previous: any) {
    envs.push({ type, value });
    return previous.concat([value]);
  };
}

dotenvxCli
  .description("access dotenvx features via dotenv-tools")

dotenvxCli
  .command("run")
  .description("inject env at runtime [dotenvx run -- yourcommand]")
  .option(
    "-e, --env <strings...>",
    'environment variable(s) set as string (example: "HELLO=World")',
    collectEnvs("env"),
    []
  )
  .option(
    "-f, --env-file <paths...>",
    "path(s) to your env file(s)",
    collectEnvs("envFile"),
    []
  )
  .option(
    "-fv, --env-vault-file <paths...>",
    "path(s) to your .env.vault file(s)",
    collectEnvs("envVaultFile"),
    []
  )
  .option("-o, --overload", "override existing env variables")
  .option(
    "--convention <name>",
    "load a .env convention (available conventions: ['nextjs'])"
  )
  .action(function (...args) {
    // @ts-expect-error: commander usage
    this.envs = envs;

    // @ts-expect-error: commander usage
    loadSecretsAndExec.apply(this, args);
  });

dotenvxCli
  .command("get")
  .description("returns a single secret (or all secrets if blank)")
  .argument("[key]", "environment variable name")
  .option(
    "-e, --env <strings...>",
    'environment variable(s) set as string (example: "HELLO=World")',
    collectEnvs("env"),
    []
  )
  .option(
    "-f, --env-file <paths...>",
    "path(s) to your env file(s)",
    collectEnvs("envFile"),
    []
  )
  .option(
    "-fv, --env-vault-file <paths...>",
    "path(s) to your .env.vault file(s)",
    collectEnvs("envVaultFile"),
    []
  )
  .option("-o, --overload", "override existing env variables")
  .option(
    "--convention <name>",
    "load a .env convention (available conventions: ['nextjs'])"
  )
  .option("-a, --all", "include all machine envs as well")
  .option("-pp, --pretty-print", "pretty print output")
  .action(function (...args) {
    // @ts-expect-error: commander usage
    this.envs = envs;

    // @ts-expect-error: commander usage
    getSecret.apply(this, args);
  });

dotenvxCli
  .command("set")
  .description("set a single environment variable")
  .allowUnknownOption()
  .argument("KEY", "secret name in uppercase and only underscores")
  .argument("value", "secret value")
  .option("-f, --env-file <paths...>", "path(s) to your env file(s)", ".env")
  .option("-c, --encrypt", "encrypt value (default: true)", true)
  .option("-p, --plain", "store value as plain text", false)
  .action(setSecret);