const Discord = require('discord.js');
const moment = require('moment');
const { prefix, kolor, footerbota, ownerid } = require('../../config.json');

module.exports = {
    name: "changelog",
    aliases: ['chl', 'chlog'],
    async execute(client, message, args) {
        const send = moment(new Date()).format('DD/MM/YYYY');
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission!**`)
        if (message.author.id !== `${ownerid}`) return message.channel.send(permoff).then((m) => m.delete({ timeout: 15000 }));  
        const channel = message.mentions.channels.first()
       
        if (!args.length) return;
        if (!channel) {
            message.reply("Nie podałeś/aś kanału, na którym mam wysłać ogłoszenie!").then((m) => m.delete({ timeout: 15000 }));  
            return;
        } else {
            const nrupdate = args.slice(1, 2).join(" ")
            if (!nrupdate) return message.reply(`Zapomniałeś/aś podać numeru update'u!`).then((m) => m.delete({ timeout: 15000 }));  

            let content = args.slice(2).join(" ")
            if (!content) return message.reply(`Zapomniałeś/aś napisać zawartosci wiadomosci!`).then((m) => m.delete({ timeout: 15000 }));  
            if (message.content.includes('--')) content = content.replace(/--/g, '\n')
            const embed = new Discord.MessageEmbed()
            .setTitle(`Changelog 🛠️`)
            .setDescription(`<:comment:898655104150929449> **Update:**\n ${nrupdate}\n\n<:checklist:845975219914801152> **Changes:**\n${content}\n\n<:calendarr:898655467813879858> **Update date:**\n ${send}  `)
            .setFooter(`Posted by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setColor(`${kolor}`)
            const msg = await channel.send(embed)         }
    }   
}
