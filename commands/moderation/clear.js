const Discord = require('discord.js');
const { kolor, defaultPrefix } = require('../../config.json');
const prefix = require('discord-prefix');



module.exports = {
    name: "clear",
    aliases: [],
    async execute(client, message, guild, args) {
        let guildPrefix = prefix.getPrefix(message.guild.id);
if (!guildPrefix) guildPrefix = defaultPrefix;
        let member = message.member
        const prefixd = prefix.getPrefix(`${member.guild.id}`)
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"clear #message ammount```")
        .addField("```Example usage```", "``"+ guildPrefix +"clear 10``", true)
        .addField("```Needs permision to use```", "``MANAGE_MESSAGES``", true)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.avatarURL())
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission to use this command!**`)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.avatarURL())
        const amount = message.content.split(" ")[1];
        
        if (!amount) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(permoff)
            
        }
         


         message.channel.bulkDelete(amount)
         //.then(messages => message.channel.send(`${messages.size} Messages deleted`))
     .then(messages => message.channel.send(`${message.author.username} delete ${amount} messages!`).then((m) => m.delete({ timeout: 10000 })))
     .catch(console.error);
     }

        
      
    }
