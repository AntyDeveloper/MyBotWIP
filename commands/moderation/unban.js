const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");

const mtd = new db.table('mtd');
module.exports = {
    name: 'unban',
    description: 'Command to unmute users!',
    async execute(client, message, args) {
        message.delete()
        let userID = args[0];

        const author = message.author

        if (!args[0]) {
            message.channel.send("**You dont mention user!\n\nCorrect usage:**\n ```"+ defaultPrefix +"unmute @user ```").then((m) => m.delete({ timeout: 5000 }));  
            } 
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            
            message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return 
            const User = client.users.cache.get(userID)
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) return
            message.guild.members.unban(bUser.user)
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${User.tag} has been unbaned`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            
        })    
        
       
    }}}