import { Command } from "npm:commander";
export const secrets = new Command("secrets");

secrets.description("manage dotenv files and dotenvx private keys")

secrets.command("pull")
.aliases(["download", "get"]);