const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, kolor } = require('../../config.json');
const discordgifs = require('@dy_lan19/discord.gifs');

module.exports = {
    name: 'cat',
    description: 'losuje ci randomowego kot.',
    aliases: [','],
    async execute(client, message, args) {
       const wifu = await discordgifs.Cat()
        message.delete()
        const info = new Discord.MessageEmbed()
        .setColor(kolor)
        .setTitle('Random cat')
        .setDescription(``)
        .setTimestamp()
        .setImage(`${wifu}`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        message.channel.send(info);   
}   
};