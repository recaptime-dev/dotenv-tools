import path from "node:path"
import * as childProceess from "node:child_process"
import { dotenvxCli } from "../../commands/dotenvx.ts";
import { logger } from "../logging.ts";

export function execEnvxCli(command, rawArgs) {
    if (!command) {
        dotenvxCli.outputHelp()
        Deno.exit(1)
    }
    const commandIndex = rawArgs.indexOf(command);
    const forwardedArgs = rawArgs.slice(commandIndex + 1)

    logger.debug(`command: ${JSON.stringify(command)}`)
    logger.debug(`args: ${JSON.stringify(forwardedArgs)}`)
}