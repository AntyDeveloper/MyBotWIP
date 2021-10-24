const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix } = require('../../config.json');
const randomanime = require('random-anime')

module.exports = {
    name: 'rianime',
    description: 'randomowe anime',
    aliases: ['ra',],
    execute(client, message, args) {
        const anime = randomanime.anime();
        message.delete()
        const author = message.author
        const info = new Discord.MessageEmbed()
        .setColor('#9c34eb')
        .setTitle('Random Anime')
        .setDescription(``)
        .setTimestamp()
        .setImage(`${anime}`)
        .setFooter(`${author.username}`, author.avatarURL())
        message.channel.send(info);
    }
};