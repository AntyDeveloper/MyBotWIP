require('dotenv').config();
const db = require("quick.db");
const blacklist = new db.table('blacklist');
const prefix = require('discord-prefix');
const { kolor, footerbota } = require('../../config.json');

module.exports = (Discord, client, message) => {
    const { defaultPrefix } = require('../../config.json')
    const embed1 = new Discord.MessageEmbed()
    .setColor(`${kolor}`)
    .setDescription(`<:Cross:847905173010382858> **You can only use commands on server!**`)
    .setFooter(`${footerbota}`)
    if (!message.guild) return message.author.send(embed1);
    let guildPrefix = prefix.getPrefix(message.guild.id);
    if (!guildPrefix) guildPrefix = defaultPrefix;
    
    if (!message.content.startsWith(guildPrefix) && !message.content.startsWith(guildPrefix.toUpperCase())) return;

    const args = message.content.slice(guildPrefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    let fetched = blacklist.fetch(`blacklist_${message.author.id}`)

    if (fetched) {
        message.delete()
        message.author.send('Zostałeś zblacklistowany z bota przez Ownera')
    } else 
    if (!command) {
        message.delete()
        message.channel.send("The command does not exist.").then((m) => m.delete({ timeout: 3000 }));
    } 
    if (command) command.execute(client, message, args, Discord); {
        message.delete()
    }

}