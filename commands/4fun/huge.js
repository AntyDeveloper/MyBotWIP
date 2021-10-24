const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { kolor, defaultPrefix } = require('../../config.json');
const discordgifs = require('@dy_lan19/discord.gifs');
const prefix = require('discord-prefix');

module.exports = {
    name: 'hug',
    description: 'Uderzysz oznaczoną osobe.',
    aliases: ["huge",],
    async execute(client, message, args) {
        message.delete()
        const user1 = message.mentions.users.first();

        const reakcja = await discordgifs.Hug()
        const autor1 = message.author.username
        const author = message.author
        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"hug <@user>```")
        .addField("```Example usage```", "``"+ guildPrefix +"hug @Aspoleczny``", true)
        .addField("```Needs permision to use```", "``NONE``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if (!user1) return message.channel.send(corect).then((m) => m.delete({ timeout: 15000 }));  
        if (user1.id === autor1.id) {
            return message.channel.send('You need mention other person!').then((m) => m.delete({ timeout: 5000 }));  
        } else {


        const info = new Discord.MessageEmbed()
        .setColor(kolor)
        .setDescription(`${author} hugged ${user1}`)
        .setTimestamp()
        .setImage(`${reakcja}`)
        .setFooter(`${author.username}`, author.avatarURL())
        message.channel.send(info);   
    
}   }
};