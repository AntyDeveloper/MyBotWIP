const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");

const mtd = new db.table('mtd');
module.exports = {
    name: 'mute',
    description: 'Command to ban users!',
    async execute(client, message, args) {
        message.delete()
        const user = message.mentions.members.first()
        const author = message.author
        const iduser = user.id;
        const User1 = client.users.cache.get(iduser)
        const authorRole = message.member.roles.highest;

        const targetRole = user.roles.highest;
        let bantime = args[1];
        let reason = args.slice(2).join(" ")
        const getthis = mtd.get(`${user}`, true)
        if(user.roles.cache.some(role => role.name === 'User Muted')) {
            message.channel.send('This user is arleady muted!')
        } else {
         const role = message.guild.roles.cache.find(role => role.name === "User Muted")

            
        if (!args[0] || !args[1] || !reason) {
            message.channel.send("**You dont mention user!\n\nCorrect usage:**\n ```"+ defaultPrefix +"mute @user @time @reason```").then((m) => m.delete({ timeout: 5000 }));  
            } 
        if(author === user){
            return message.channel.send('You cant ban your person!').then((m) => m.delete({ timeout: 15000 })); 
        }
        if(targetRole <= authorRole) {
         return message.channel.send('This person have highhest role!').then((m) => m.delete({ timeout: 15000 })); 
            
       } 
        if (user.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('You cant ban this person!')
            
        } 
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            user.roles.add(role)
            mtd.set(`${user}`, true)
            setTimeout(function(){
                user.roles.remove(role)
                mtd.delete(`${user}`, true)
              }, ms(bantime)); 
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${user} has muted from reason: ${reason}.`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            
            }       
        
       
        }}}