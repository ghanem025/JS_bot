
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const monkeArray = [
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
    const monkeGIF = monkeArray[Math.floor(Math.random() * monkeArray.length)]
    message.channel.send(monkeGIF)
  }
  if(message.content === '$joke'){
    getJoke().then(jokes =>
      message.channel.send(jokes))
  }

})

client.login(process.env.TOKEN);
