const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix, kolor } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require("quick.db");
const prefix = require('discord-prefix');
const mtd = new db.table('mtd');

module.exports = {
    name: 'mute',
    description: 'Command to ban users!',
    async execute(client, message, args) {
        let guildPrefix = prefix.getPrefix(message.guild.id);
if (!guildPrefix) guildPrefix = defaultPrefix;
        const user = message.mentions.members.first()
        const author = message.author

        const authorRole = message.member.roles.highest;
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission to use this command!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        const arldm = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:comment:898655104150929449> **This user is arleady muted!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        const cntb = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:comment:898655104150929449> **You cant ban your person!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        const highr = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:comment:898655104150929449> **This person have highhest role!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
  
        let bantime = args[1];
        let reason = args.slice(2).join(" ")
        const getthis = mtd.get(`${user}`, true)
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"mute @user @time @reason```")
        .addField("```Example usage```", "``"+ guildPrefix +"mute @AntyDev 1h my reason``", true)
        .addField("```Needs permision to use```", "``MANAGE_MESSAGES``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if (!args[0] || !args[1] ) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
        else {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
           return message.channel.send(permoff)
           
       } else {
        if(!user.user.roles.has('User Muted')) {
            message.channel.send(arldm)
        } else {
         const role = message.guild.roles.cache.find(role => role.name === "User Muted")

            
 
        if(author === user){
            return message.channel.send(cntb).then((m) => m.delete({ timeout: 15000 })); 
        }
        if(user.roles.highest.position > message.guild.members.resolve(author).roles.highest.position) {
         return message.channel.send(highr).then((m) => m.delete({ timeout: 15000 })); 
            
       } 

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
            
            
        
       
        }}}}}