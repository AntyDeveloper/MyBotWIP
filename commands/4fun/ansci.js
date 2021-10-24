const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix } = require('../../config.json');
const discordgifs = require('@dy_lan19/discord.gifs');

module.exports = {
    name: 'ascii',
    description: 'Uderzysz oznaczoną osobe.',
    aliases: [,],
    async execute(client, message, args) {
        const reakcja1 = args.join(' ');
        const reakcja = await discordgifs.Ascii(reakcja1)
        message.delete()
        const info = new Discord.MessageEmbed()
        .setColor('#9c34eb')
        .setDescription(`${reakcja}`)
        .setTimestamp()
        .setImage(``)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        message.channel.send(info);   
    
}   
};