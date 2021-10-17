const Discord = require('discord.js');
const { kolor, defaultPrefix, footerbota } = require('../../config.json') 

const prefix = require('discord-prefix');

module.exports = {
    name: "setprefix",
    aliases: ['setp', 'stp'],
    usage: "setprefix <prefix>",
    async execute(client, message, args) {
        message.delete()
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(permoff).then((m) => m.delete({ timeout: 15000 }));  
        let prefix1 = args.join(" ")
        let member = message.member
        const prefixd = prefix.getPrefix(`${member.guild.id}`)

        if (prefix1 = prefixd) {
            const embed5 = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setDescription(`**This prefix is actualy use on the server!**`)
            .setFooter(`${footerbota}`)
            message.channel.send(embed5).then((m) => m.delete({ timeout: 15000 }));   

        } else {
        if (prefix1 = defaultPrefix) {
            const embed5 = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setDescription(`**This prefix is actualy use on the server!**`)
            .setFooter(`${footerbota}`)
            message.channel.send(embed5).then((m) => m.delete({ timeout: 15000 }));   

        }
        if (prefix1 < 1){
            prefix.setPrefix(`${defaultPrefix}`, `${member.guild.id}`)

            const embed1 = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setDescription(`**Prefix on ${member.guild.name} has set to default!**`)
            .setFooter(`${footerbota}`)
            
    
            message.channel.send(embed1).then((m) => m.delete({ timeout: 15000 }));   
        }
        else {
            const embed2 = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setDescription(`**Prefix must have only 1 symbol!**`)
            .setFooter(`${footerbota}`)
            if (args.length > 2) return message.channel.send(embed2).then((m) => m.delete({ timeout: 15000 }));  
        }
            if (args.length = 2)
            prefix.setPrefix(`${prefix1}`, `${member.guild.id}`);
    
            const embed3 = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setDescription(`**Prefix on ${member.guild.name} has changed!**`)
            .setFooter(`${footerbota}`)
    
            message.channel.send(embed3).then((m) => m.delete({ timeout: 15000 }));  
    }}
}