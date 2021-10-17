const Discord = require('discord.js');
const { kolor, footerbota } = require('../../config.json');
const prefix = require('discord-prefix');

module.exports = {
    name: "clear",
    aliases: [],
    async execute(client, message, guild) {
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
         const amount = message.content.split(" ")[1];
         if(!amount)
         {
             message.reply(`<How many message delete?>`).then((m) => m.delete({ timeout: 15000 }));
             return;
         }
          if(!message.member.hasPermission("MANAGE_MESSAGES"))
          {
             message.channel.send(permoff);
             return;
          }
         message.channel.bulkDelete(amount)
         //.then(messages => message.channel.send(`${messages.size} Messages deleted`))
     .then(messages => message.channel.send(`${message.author.username} delete ${amount} messages!`).then((m) => m.delete({ timeout: 10000 })))
     .catch(console.error);
     }

        
      
    }
