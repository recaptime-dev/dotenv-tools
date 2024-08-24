#!/usr/bin/env -S deno run -A
import { Command, program } from "commander"
import { name, version, description } from "./lib/constants.ts"
import { setLogLevel } from "./lib/logging.ts";
import { setupRepo } from "./commands/setup.ts";
import { dotenvxCli } from "./commands/dotenvx.ts";

program
  .name(name)
  .version(version)
  .description(description)
  .usage("[global opts] command")
  .option("-l, --log-level <level>", "set log level", "info")
  .option("-q, --quiet", "sets log level to error")
  .option("-v, --verbose", "sets log level to verbose")
  .option("-d, --debug", "sets log level to debug")
  .hook("preAction", (thisCommand: Command, actionCommand: Command) => {
    const options = thisCommand.opts();
    setLogLevel(options);
  });

program
  .command("init")
  .description("setup a fresh centralized git repo for dotenvx management")
  .option("-c, --copy-missing", "only copy missing files")
  .option("-o, --overwrite, --override", "overwrite existing files")
  .option(
    "-b, --default-branch, --branch",
    "default branch name for 'git init'",
    "main"
  )
  .argument("[directory]", "directory where files will be copied")
  .alias("setup")
  .action(setupRepo);

program.addCommand(dotenvxCli)
program.parse()