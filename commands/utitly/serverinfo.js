const Discord = require('discord.js');
const moment = require('moment');
moment().format('DD, MMMM Do YYYY');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, kolor } = require('../../config.json');



module.exports = {
    name: 'serverinfo',
    description: 'server',
    aliases: ['server',],
    execute(client, message, args) {
        const created = moment(message.author.createdAt).format('DD/MM/YYYY');
        const join = moment(message.member.joinedAt).format('DD/MM/YYYY');
        const info = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle('Informacje o serwerze')
        .setThumbnail(`${client.user.avatarURL()}`)
        .setDescription(`**Server name** <:globe:845819287289331753>\n> ${message.guild.name}\n\n**Server owner** <:personframe:845799554619670569>\n> ${message.guild.owner}\n\n**User ammount** <:chart1:845783674377338890>\n> ${message.guild.memberCount}\n\n**Create date** <:archive:845790563243917362>\n> ${created}\n\n**Join date** <:personadd:845790111173312523>\n > ${join}\n\n **Server ID** <:checklist:845975219914801152>\n> ${message.guild.id}`)
        .setTimestamp()
        .setFooter(`${client.user.username}`)
    
        message.channel.send(info);
    }
};