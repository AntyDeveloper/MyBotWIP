const Discord = require('discord.js');
const client = new Discord.Client();
const { token, kolor, footerbota } = require('./config.json');
const disbut = require('discord-buttons');

client.commands = new Discord.Collection();
client.event = new Discord.Collection();

[`command_handler`, `event_handler`].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
})

client.on('message', message => {
  if(message.content === "bogini") {
    const emebed = new Discord.MessageEmbed()
    .setDescription('[Young leosia moja bogini](https://youtu.be/C6o-jM57R6U?t=5)')
    .setImage('https://cdn.discordapp.com/attachments/898227154096107520/899713986042404924/comment_bjFouYdN1Ixx6hrnlvJ7BmPeiCnkt5kw.gif')
    message.channel.send(emebed)
  }

})

client.on('message', message => {
  const { last_letter } = require('./config.json');
  if (message.channel.id !== last_letter) return;
  if (message.content.includes(" ")) return message.delete()
  if (/[^a-zA-Z]/.test(message.content)) return message.delete()

  message.channel.messages.fetch({ limit: 2 }).then(messages => {
    let msgC1 = messages.first().content.slice(0, 1)
    let msgC2 = messages.last().content.slice(-1)
    if (msgC1 !== msgC2) return message.delete()
  })

});

client.login(token);