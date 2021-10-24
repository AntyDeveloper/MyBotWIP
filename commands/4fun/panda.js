const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { kolor, defaultPrefix } = require('../../config.json');
const discordgifs = require('@dy_lan19/discord.gifs');

module.exports = {
    name: 'panda',
    description: 'losuje ci randomową pande.',
    aliases: [,],
    async execute(client, message, args) {
        const wifu = await discordgifs.Panda()
        message.delete()
        const info = new Discord.MessageEmbed()
        .setColor(kolor)
        .setTitle('Random panda')
        .setDescription(``)
        .setTimestamp()
        .setImage(`${wifu}`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        message.channel.send(info);   
}   
};