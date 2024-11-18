import {
  GatewayIntentBits,
  Events,
  Message,
  PartialMessage,
  userMention,
} from "discord.js";
import MittensClient from "./utils/Client.ts";
import { readEnv } from "./utils/readEnv.ts";

// need to first init the client because some migrations in init() depend on client being up
export const client = new MittensClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once("ready", async () => {
  console.log("もしもし");
});

client.login(readEnv("DISCORD_TOKEN"));
