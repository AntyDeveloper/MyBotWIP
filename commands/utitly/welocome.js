const Discord = require('discord.js');
const db = require("quick.db");
const wcha = new db.table('wcha');
const { kolor, defaultPrefix } = require('../../config.json')
module.exports = {
    name: "wscreen",
    aliases: ['welcome', 'powitanie', 'we'],
    usage: "wscreen <kanał> <kolor-HEX> <wiadomość>",
    async execute(client, message, args) {
        message.delete()
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(permoff).then((m) => m.delete({ timeout: 15000 }));  
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ defaultPrefix +"welcome #channel #hexcolor #message```")
        .addField("```Example usage```", "``welcome #welcome #f8d4dc Hello bro!``", true)
        .addField("```Needs permision to use```", "``ADMINISTRATOR``", true)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.avatarURL())
        if (!args[0] || !args[1] || !args[2] ) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  

        const channel = message.mentions.channels.first()
        const color = args[1]
        if (!/^#[0-9A-F]{6}$/i.test(color)) return message.channel.send(`Bad HEX color`)

        let wiadomosc = args.slice(2).join(" ")
        //if (wiadomosc.includes('{member}')) wiadomosc = wiadomosc.replace(/{member}/g, '${member}')
        let member = message.member

        wcha.set(`${member.guild.id}`, { color: color, text: wiadomosc, channel: channel.id})

        const info = new Discord.MessageEmbed()
        .setColor(wcha.get(`${member.guild.id}.color`))
        .setTitle(`Welcome on: ${member.guild.name}!`)
        .setDescription(`${member.user}, ` + wcha.get(`${member.guild.id}.text`))
        //.addField('member count', member.guild.memberCount)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(`This is what the invitation to this server will look like!\nIt will be sent to: <#${wcha.get(`${member.guild.id}.channel`)}>`, info)
    }
}