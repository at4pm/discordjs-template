const { join } = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const loadCommands = require("./loaders/commands.js");
const loadEvents = require("./loaders/events.js");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

loadCommands(client, join(__dirname, "commands"));
loadEvents(client, join(__dirname, "events"));

(async () => {
    await client.login(config.bot_token);
})();