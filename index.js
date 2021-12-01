
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function getJoke(){
  return fetch("https://v2.jokeapi.dev/joke/Any")

    .then(res => {
      return res.json()
    })
    .then (data => {
      return data['setup'] + ' ..... ' + data['delivery']
    })
}
client.on("ready",()=> {
  console.log('logged in as ${client.user.tag}!')
});



client.on('messageCreate', (message) => {
  if (message.author.bot) return
  if (message.content === 'ping'){
    message.reply('pong')
  }
  if(message.content === '!monke'){
    message.channel.send('https://tenor.com/view/leon-side-eyes-leon-ok-and-leon-monkey-eyes-side-eyes-ok-and-gif-22597413')
  }
  if(message.content === '$joke'){
    getJoke().then(jokes =>
      message.channel.send(jokes))
  }

})

client.login(process.env.TOKEN);
