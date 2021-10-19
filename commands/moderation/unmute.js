const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix, kolor } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");
const prefix = require('discord-prefix');

const mtd = new db.table('mtd');
module.exports = {
    name: 'unmute',
    description: 'Command to unmute users!',
    async execute(client, message, args) {
        const user = message.mentions.members.first()
        const author = message.author

        const authorRole = message.member.roles.highest;
        const role = message.guild.roles.cache.find(role => role.name === "User Muted")
        const arldd = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:comment:898655104150929449> **This user is not arleady muted!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, client.user.avatarURL())
        
        const getthis = mtd.get(`${user}`)

        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(permoff)
        }
        if(!user.roles.cache.some(role => role.name === 'User Muted')) {
            message.channel.send(arldd)
        } else {

            
            const corect = new Discord.MessageEmbed()
            .setColor(`${kolor}`)
            .setTitle(`Incorrect command usage`)
            .setDescription("**Correct usage:**\n ```"+ defaultPrefix +"mute @user @time @reason```")
            .addField("```Example usage```", "``"+ defaultPrefix +"mute @AntyDev 1h my reason``", true)
            .addField("```Needs permision to use```", "``MANAGE_MESSAGES``", true)
            .setTimestamp()
            .setFooter(`${author.username}`, author.avatarURL())
            if (!args[0]) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
        if(author === user){
            return message.channel.send('<:comment:898655104150929449> You cant unmute your person!').then((m) => m.delete({ timeout: 15000 })); 
        }

        
       
            user.roles.remove(role)
            mtd.delete(`${user}`, true)
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${user} has unmuted`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            
             
        
       
        }}}