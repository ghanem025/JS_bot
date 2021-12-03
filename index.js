
require('dotenv').config();
const {Client, Collection, Intents} = require('discord.js');
const fetch = require('node-fetch')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {SlashCommandBuilder} = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {clientId, guildId, token } = require('./config.json');// used our config.JSON file to obtain clientId guildId and token
const fs = require('fs');

client.commands = new Collection();// allows us to access commands from other files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  //this will set a new item in the Collection
  client.commands.set(command.data.name, command);
}
// now we are going to dynamically retrieve the command files

const monkeArray = [// array of moneky gifs
  "https://tenor.com/view/leon-side-eyes-leon-ok-and-leon-monkey-eyes-side-eyes-ok-and-gif-22597413",
  "https://tenor.com/view/monkey-cool-monkey-monkey-eating-pog-monkey-snub-nosed-monkey-gif-21132579",
  "https://tenor.com/view/money-rich-monkey-wealthy-monkey-business-gif-17154331",
  "https://tenor.com/view/monkey-animal-crazy-wild-animal-gif-16991056",
  "https://tenor.com/view/angry-mad-monkey-twitch-monkey-smash-gif-16918229",
  "https://tenor.com/view/monkey-happy-water-alzolanskii-gif-19733563",
  "https://tenor.com/view/monkey-door-jumping-happy-excited-gif-14554367",
  "https://tenor.com/view/monkey-with-money-happy-withmoney-swag-dollars-more-money-gif-14116367",
  "https://tenor.com/view/monkey-funny-falling-monkey-monkey-ape-monkeys-gif-23927945",
  "https://tenor.com/view/monkey-monke-slap-hit-bonk-gif-23810578",
  "https://tenor.com/view/monkey-monkey-steals-monkey-swipes-gif-13449256",
  "https://tenor.com/view/disgust-monkey-monkey-cook-cook-disappointed-gif-5120770",
  "https://tenor.com/view/monkey-aquapark-glasses-based-gif-22841182",
  "https://tenor.com/view/dance-happy-gorilla-enjoying-dancing-gif-17773698"
]

client.on("ready",()=> {//when the client is connected print out a confirmation statement
  console.log(`logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {//create interactions with bot
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  const command = client.commands.get(interaction.commandName);//get the command name from interaction(what the user sent)

	if (!command) return;// if there are no commands return

	try {
		await command.execute(interaction);//wait for command to be sent by bot
	} catch (error) {
		console.error(error);// catch any unexpected errors and return message.
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

function getJoke(){//this is an API that fetchs a random joke and creates a JSON for the bot to read
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then (data => {
      return data[0]['q']//format our JSON object array
    })
}

client.on('messageCreate', (message) => {//this checks if a user sent a specific string
  if (message.author.bot) return
  if(message.content === '!monke'){// if the !monke string is sent we post a random gif
    const monkeGIF = monkeArray[Math.floor(Math.random() * monkeArray.length)]
    message.channel.send(monkeGIF)//send message to the channel
  }
  if(message.content === '!joke'){// if the !joke string is sent we post a random joke from our API
    getJoke().then(jokes =>
      message.channel.send(jokes))//send randomly generated joke to a channel
  }
  if(message.content === '!dream'){// if the !joke string is sent we post a random joke from our API
      message.channel.send('https://www.youtube.com/watch?v=T78nq62aQgM')//send randomly generated joke to a channel
  }
})

client.login(process.env.TOKEN);//login with our bot token
