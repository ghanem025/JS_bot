require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on("ready",()=> {
  console.log('logged in as $ {client.user.tag}!')
})


client.on("message", msg => {
  if (msg.conent == "ping"){
    msg,reply("hello, you need something?")
  }
})

client.login(process.env.TOKEN)
