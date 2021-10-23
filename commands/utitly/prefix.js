const Discord = require('discord.js');
const { kolor, defaultPrefix } = require('../../config.json');
const prefix = require('discord-prefix');

module.exports = {
    name: "prefix",
    aliases: [],
    async execute(client, message, args) {
        let member = message.member
        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;

        const embed1 = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`**Prefix on ${member.guild.name}: ${guildPrefix}**`)
        .setFooter(`${message.author.username}`, message.author.avatarURL())

        message.channel.send(embed1).then((m) => m.delete({ timeout: 30000 }));      
        }
    }   
