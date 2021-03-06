const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {  kolor, defaultPrefix } = require('../../config.json');
const prefix = require('discord-prefix');

module.exports = {
    name: 'user',
    description: 'server',
    execute(client, message, args) {
        const user = message.mentions.members.first();
        const author = message.author

        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;

        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"user @user```")
        .addField("```Example usage```", "``"+ guildPrefix +"user @AntyDev``", true)
        .addField("```Needs permision to use```", "``NOT_NEED``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if(!args[0]) return message.channel.send(corect).then((m) => m.delete({ timeout: 30000 }));
        else {
        const created = moment(message.author.createdAt).format('DD/MM/YYYY');
        const join = moment(message.member.joinedAt).format('DD/MM/YYYY');
        const info = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setTitle(`Information about user`)
        .setDescription(`**Username** <:personframe:845799554619670569>\n> ${user.user.tag}\n\n**Account create** <:settings:845788459620499516>\n> ${created}\n\n**Join date** <:personadd:845790111173312523>\n > ${join}`)
        .setTimestamp()
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(info).then((m) => m.delete({ timeout: 300000 }));
    }}
};