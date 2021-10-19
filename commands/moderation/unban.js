const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix, kolor } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");
const prefix = require('discord-prefix');
const mtd = new db.table('mtd');
module.exports = {
    name: 'unban',
    description: 'Command to unban users!',
    async execute(client, message, args) {
        message.delete()
        let userID = args[0];



        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission to use this command!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, client.user.avatarURL())

        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ defaultPrefix +"unban @user```")
        .addField("```Example usage```", "``"+ defaultPrefix +"unban @AntyDev``", true)
        .addField("```Needs permision to use```", "``BAN_MEMBERS``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if (!args[0] || !args[1] ) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
        else {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(permoff)
            
        } 
            
            message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return 
            const User = client.users.cache.get(userID)
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) return
            message.guild.members.unban(bUser.user)
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${User.tag} has been unbaned!`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            
        })    
    }
       
    }}