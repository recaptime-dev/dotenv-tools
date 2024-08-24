import { Command } from "commander"
import { execEnvxCli } from "../lib/helpers/dotenvxCli.ts";
export const dotenvxCli = new Command("dotenvx")
import { process } from "node:prcoess"

dotenvxCli
  .description("access dotenvx features via dotenv-tools")
  .action((command, args, cmdObj) => {
    const rawArgs = Deno.args.slice(2); // adjust the index based on where actual args start
    execEnvxCli(command, rawArgs);
  });