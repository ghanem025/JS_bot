require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on("ready",()=> {
  console.log('logged in as ${client.user.tag}!')
});


client.on('messageCreate', (message) => {
  if (message.content === 'ping'){
    message.reply({content: 'pong'})
  }
  if(message.content === 'monke'){
    message.reply({content: ':gorilla:'})
  }
})

client.login(process.env.TOKEN);
