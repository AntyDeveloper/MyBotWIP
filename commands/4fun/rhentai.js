const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix } = require('../../config.json');
const randomanime = require('random-anime')

module.exports = {
    name: 'rhentai',
    description: 'randomowy anime hentai',
    aliases: ['rh',],
    execute(client, message, args) {
        const anime = randomanime.nsfw();
        message.delete()
        const info = new Discord.MessageEmbed()
        .setColor('#9c34eb')
        .setTitle('Random Hentai')
        .setDescription(``)
        .setTimestamp()
        .setImage(`${anime}`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        message.channel.send(info);
    }
};