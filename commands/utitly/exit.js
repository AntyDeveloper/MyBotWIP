const Discord = require('discord.js');
const db = require("quick.db");
const echa = new db.table('echa');

module.exports = {
    name: "escreen",
    aliases: ['exit', 'pożegnanie', 'ex'],
    usage: "wscreen <kanał> <kolor-HEX> <wiadomość>",
    async execute(client, message, args) {
        message.delete()
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(permoff).then((m) => m.delete({ timeout: 15000 }));  
        if (args.length < 3) return message.channel.send('nunu')

        const channel = message.mentions.channels.first()
        const color = args[1]

        if (!/^#[0-9A-F]{6}$/i.test(color)) return message.channel.send(`Bad HEX color`)

        let wiadomosc = args.slice(2).join(" ")
        //if (wiadomosc.includes('{member}')) wiadomosc = wiadomosc.replace(/{member}/g, '${member}')
        let member = message.member

        echa.set(`${member.guild.id}`, { color: color, text: wiadomosc, channel: channel.id})

        const info = new Discord.MessageEmbed()
        .setColor(echa.get(`${member.guild.id}.color`))
        .setTitle(`Godbye from: ${member.guild.name}!`)
        .setDescription(`${member.user}, ` + echa.get(`${member.guild.id}.text`))
        //.addField('member count', member.guild.memberCount)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(`This is what the invitation to this server will look like!\nIt will be sent to: <#${echa.get(`${member.guild.id}.channel`)}>`, info)
    }
}