import {
  Client,
  ClientOptions,
  Collection,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { readdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { CommandData, commands } from "./cmdLoader.js";

// 何これ、要らんね
// まぁ、わかるけど
export default class MittensClient extends Client {
  #rest: REST = new REST().setToken(process.env.DISCORD_TOKEN as string);
  /* "add": CommandData {data: SlashCommand, execute: function} */
  commands = new Collection<string, CommandData>();
  constructor(options: ClientOptions) {
    super(options);
    commands.forEach((c) => this.addToCollection(c));
    this.loadCommands();
  }

  addToCollection(listener: CommandData) {
    this.commands.set(listener.command.name, listener);
  }

  async loadCommands() {
    // register all the commands
    await this.#rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string),
      { body: this.commands.map((c) => c.command.toJSON()) }
    );
  }
}
