const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, kolor } = require('../../config.json');


module.exports = {
    name: 'userinfo',
    description: 'server',
    aliases: ['info',],
    execute(client, message, args) {
        const user = message.mentions.members.first();
        message.delete()
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ defaultPrefix +"userinfo @user```")
        .addField("```Example usage```", "``"+ defaultPrefix +"userinfo @AntyDev``", true)
        .addField("```Needs permision to use```", "``NOT_NEED``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if(!args[0]) return message.channel.send(corect)
        else {
        const created = moment(message.author.createdAt).format('DD/MM/YYYY');
        const join = moment(message.member.joinedAt).format('DD/MM/YYYY');
        const info = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setTitle('Informacje o użytkowniku')
        .setDescription(`**Username** <:personframe:845799554619670569>\n> ${message.author.tag}\n\n**Account create** <:settings:845788459620499516>\n> ${created}\n\n**Join date** <:personadd:845790111173312523>\n > ${join}`)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(info);
    }}
};