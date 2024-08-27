import { Command } from "npm:commander";
import { logger } from "../lib/logging.ts";
export const secrets = new Command("secrets");
import { input, select, Separator } from "@inquirer/prompts";

secrets.description("manage dotenv files and dotenvx private keys")

secrets.command("init")
  .aliases(["setup"])
  .description("setup your project for centralized dotenvx-encrypted env files management")
  .option("-o, --overwrite", "overwrite existing configuration")
  .action(async(options) => {
    logger.debug(`options: ${JSON.stringify(options)}`)
    if (options.overwrite !== true) {
      logger.error("You cannot proceed here without the --overwrite flag.")
      Deno.exit(1)
    }
    const url = await input({
      message: "Enter repository URL of your centralized dotenvx-encrypted secrets",
      required: true,
      validate: (string) => {
        try {
          new URL(string)
          return true
        } catch (_err) {
          return false
        }
      } })
    const codeForgeType = await select({
      message: "What kind of code forge is this repository URL for?",
      choices: [
        {
          name: "GitHub",
          value: "github"
        },
        {
          name: "GitLab",
          value: "gitlab"
        },
        {
          name: "Gitea / Forgejo",
          value: "gitea-forgejo"
        },
        {
          name: "sourcehut",
          value: "sourcehut"
        },
        new Separator(),
        {
          name: "Launchpad.net (not yet supported)",
          value: "launchpad"
        }
      ]
    });
    const defaultBranch = await input({ message: "Default branch", default: "main" })
    logger.debug(`configData: ${JSON.stringify({url, codeForgeType, defaultBranch})}`)
  })

secrets.command("pull")
  .aliases(["download", "get"])
  .option("-b, --branch <name>", "branch name to pull from (defaults to branch name on config or `main`", "main")