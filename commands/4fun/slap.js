const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { kolor, defaultPrefix } = require('../../config.json');
const discordgifs = require('@dy_lan19/discord.gifs');
const prefix = require('discord-prefix');

module.exports = {
    name: 'slap',
    description: 'Uderzysz oznaczoną osobe.',
    aliases: ["punch",],
    async execute(client, message, args) {
        message.delete()
        const author = message.author

        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"slap <@user>```")
        .addField("```Example usage```", "``"+ guildPrefix +"slap @Aspoleczny``", true)
        .addField("```Needs permision to use```", "``NONE``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        const reakcja = await discordgifs.Slap()
        const autor1 = message.author
        const user1 = message.mentions.users.first();
        if (user1.id === autor1.id) {
        return message.channel.send('You need Mention other person!').then((m) => m.delete({ timeout: 15000 }));  
    } else {
        if (!user1) return message.channel.send(corect).then((m) => m.delete({ timeout: 15000 }));  
        const info = new Discord.MessageEmbed()
        .setColor(kolor)
        .setDescription(`${autor1} slapped ${user1}`)
        .setTimestamp()
        .setImage(`${reakcja}`)
        .setFooter(`${author.username}`, author.avatarURL())
        message.channel.send(info);   
    
}}   
};