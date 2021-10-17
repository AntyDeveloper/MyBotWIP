const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");

const mtd = new db.table('mtd');
module.exports = {
    name: 'unmute',
    description: 'Command to unmute users!',
    async execute(client, message, args) {
        message.delete()
        const user = message.mentions.members.first()
        const author = message.author
        const iduser = user.id;
        const User1 = client.users.cache.get(iduser)
        const authorRole = message.member.roles.highest;
        const role = message.guild.roles.cache.find(role => role.name === "User Muted")


        const getthis = mtd.get(`${user}`)
        if(!user.roles.cache.some(role => role.name === 'User Muted')) {
            message.channel.send('This user is not arleady muted!')
        } else {

            
        if (!args[0]) {
            message.channel.send("**You dont mention user!\n\nCorrect usage:**\n ```"+ defaultPrefix +"unmute @user ```").then((m) => m.delete({ timeout: 5000 }));  
            } 
        if(author === user){
            return message.channel.send('You cant unmute your person!').then((m) => m.delete({ timeout: 15000 })); 
        }

        
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            user.roles.remove(role)
            mtd.delete(`${user}`, true)
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${user} has unmuted`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            
            }       
        
       
        }}}