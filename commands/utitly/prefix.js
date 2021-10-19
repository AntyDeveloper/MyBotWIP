const Discord = require('discord.js');
const { kolor, defaultPrefix } = require('../../config.json');
const prefix = require('discord-prefix');

module.exports = {
    name: "prefix",
    aliases: [],
    async execute(client, message, args) {
        let member = message.member
        const prefixd = prefix.getPrefix(`${member.guild.id}`)

        const embed1 = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`**Prefix on ${member.guild.name}: ${prefixd}**`)
        .setFooter(`${message.author.username}`, message.author.avatarURL())
        const embed11 = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`**Prefix on ${member.guild.name}: ${defaultPrefix}**`)
        .setFooter(`${message.author.username}`, message.author.avatarURL())
        if(prefixd === null) return message.channel.send(embed11).then((m) => m.delete({ timeout: 30000 }));  else {



        message.channel.send(embed1).then((m) => m.delete({ timeout: 30000 }));      
        }
    }   
}