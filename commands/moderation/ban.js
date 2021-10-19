const Discord = require('discord.js');
const ms = require('ms')
const { defaultPrefix, kolor } = require('../../config.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = require('discord-prefix');

const embed = new Discord.MessageEmbed()
.setColor(kolor)
module.exports = {
    name: 'ban',
    description: 'Command to ban users!',
    async execute(client, message, args, guild) {
        message.delete()
        const user = message.mentions.members.first()

        const author = message.author
        const authorRole = message.member.roles.highest;
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission to use this command!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        let bantime = args[1];
        let reason = args.slice(2).join(" ")
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ prefix +"ban @user @time @reason```")
        .addField("```Example usage```", "``"+ prefix +"ban @AntyDev 1h my reason``", true)
        .addField("```Needs permision to use```", "``BAN_MEMBERS``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if (!args[0] || !args[1] || !reason ) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
        
             else {
                if (!message.member.hasPermission('BAN_MEMBERS')) {
                    return message.channel.send(permoff)
                } 
            if(user.roles.highest.position > message.guild.members.resolve(author).roles.highest.position) {
                const highest = new Discord.MessageEmbed()
                .setColor(`${kolor}`)
                .setDescription(`<:comment:898655104150929449> **This person have highest role!**`)
                .setTimestamp()
                .setFooter(`${author.username}`, author.avatarURL())
                message.channel.send(highest).then((m) => m.delete({ timeout: 15000 })); 
        

        } else {

            
            user.send(`You banned from ${guild.name}.`)
            user.ban({
                reason: `${author.tag} banned ${user.user.tag} from reason: ${reason}.`,
            })
            setTimeout(function(){
                message.guild.members.unban(user)
              }, ms(bantime)); 
            const banembed = new Discord.MessageEmbed()
            .setThumbnail(user.user.displayAvatarURL())
            .setDescription(`${user} has banned from reason: ${reason}.`)
            .setColor(kolor)
            .setTimestamp()
            .setFooter(`${author.username}`, author.avatarURL())
            message.channel.send(banembed).then((m) => m.delete({ timeout: 15000 }));  
    }}

}}