const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'ban',
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
        

        if (!args[0] || !args[1] || !reason) {
            message.channel.send("**You dont mention user!\n\nCorrect usage:**\n ```"+ defaultPrefix +"ban @user @time @reason```").then((m) => m.delete({ timeout: 5000 }));  
            } else {
        if(author === user){
            return message.channel.send('You cant ban your person!').then((m) => m.delete({ timeout: 15000 })); 
        }
        else {
            if(targetRole <= authorRole) {
                return message.channel.send('This person have highhest role!').then((m) => m.delete({ timeout: 15000 })); 
            
    } else {
        if(message.guild.ownerID == message.author.id) {
            user.ban({
                reason: `${author.tag} banned ${User1.tag} from reason: ${reason}.`,
            })

            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${user} has banned from reason: ${reason}.`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
            user.message.send()

        } else {

        
        if (user.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('You cant ban this person!')
            
        } else {
            user.ban({
                reason: `${author.tag} banned ${User1.tag} from reason: ${reason}.`,
            })
            setTimeout(function(){
                message.guild.members.unban(user)
              }, ms(bantime)); 
            const banembed = new Discord.MessageEmbed()
            .setThumbnail()
            .setDescription(`${user} has banned from reason: ${reason}.`)
            .setTimestamp()
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
             user.message.send()
    }}}

}}}}