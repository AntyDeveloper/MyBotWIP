const Discord = require('discord.js');
const { kolor, footerbota } = require('../../config.json');
const prefix = require('discord-prefix');

module.exports = {
    name: "prefix",
    aliases: [],
    async execute(client, message, args) {
        message.delete()
        let member = message.member
       const prefixd = prefix.getPrefix(`${member.guild.id}`)
        const embed1 = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`**Prefix on ${member.guild.name}: ${prefixd}**`)
        .setFooter(`${footerbota}`)


        message.channel.send(embed1).then((m) => m.delete({ timeout: 30000 }));      

    }   
}