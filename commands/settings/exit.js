const Discord = require('discord.js');
const db = require("quick.db");
const echa = new db.table('echa');
const { kolor, defaultPrefix } = require('../../config.json')
const prefix = require('discord-prefix');

module.exports = {
    name: "escreen",
    aliases: ['exit', 'pożegnanie', 'ex'],
    usage: "wscreen <kanał> <kolor-HEX> <wiadomość>",
    async execute(client, message, args) {
        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(permoff).then((m) => m.delete({ timeout: 15000 }));  
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"exit #channel #hexcolor #message```")
        .addField("```Example usage```", "``"+ guildPrefix +"welcome #welcome #f8d4dc Bye bro!``", true)
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
        echa.set(`${member.guild.id}`, { color: color, text: wiadomosc, channel: channel.id})

        const info = new Discord.MessageEmbed()
        .setColor(echa.get(`${member.guild.id}.color`))
        .setTitle(`Goodbye from: ${member.guild.name}!`)
        .setDescription(`${member.user}, ` + echa.get(`${member.guild.id}.text`))
        //.addField('member count', member.guild.memberCount)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(`This is what the invitation to this server will look like!\nIt will be sent to: <#${echa.get(`${member.guild.id}.channel`)}>`, info)
    }
}