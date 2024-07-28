const { join } = require("node:path");
const { REST, Routes } = require("discord.js");
const loadCommands = require("./loaders/commands");
const config = require("./config.json");

const commands = loadCommands(null, join(__dirname, "commands"));
const rest = new REST().setToken(config.bot_token);

async function deploy() {
	console.log(
		`Started refreshing ${commands.length} application (/) commands.`,
	);

	const application = await rest.get(Routes.oauth2CurrentApplication());
	const data = await rest.put(Routes.applicationCommands(application.id), {
		body: commands,
	});

	console.log(
		`Successfully reloaded ${data.length} application (/) commands.`,
	);
}

deploy();