//this file saves all of our commands in the command file to our bot
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));//filter out the files that don't end with js

for (const file of commandFiles) {//for loop that takes all the command js files in the command folder
	// and coverts that data into a JSON
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })//registered application commands for a specific guildId (specific server)
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
