const Discord = require('discord.js')
const disbut = require('discord-buttons');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = require('discord-prefix');

const { kolor, defaultPrefix } = require('../../config.json')


module.exports = {
	name: 'help',
        aliases: ['bot'],
	description: 'botifno comand',
	async execute(client, message, args) {
        const member = message.member
        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;
    let helpmodb = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('🛑» Moderation') 
    .setID('helpmodb') 
    let helputilb = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('🔰» Utitly')
    .setID('helputilb')
    let helpsettingsb = new disbut.MessageButton()
    .setStyle('blurple')
    .setLabel('⚙» Settings')
    .setID('helpsettingsb')
    let economyb = new disbut.MessageButton()
    .setStyle('grey')
    .setLabel('💰» Economy [soon]')
    .setID('economyseetingsb')
    .setDisabled()
    
    const help1 = new Discord.MessageEmbed()
    .setDescription(`**Commands categories**\n\n🛑» Moderation\n🔰» Utitly\n⚙» Settings\n💰» Economy [soon]`)
    .addFields(
		{ name: 'Credits', value: 'Bot owner <@534781539691659264>', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
    .setTimestamp()
    const helpmod = new Discord.MessageEmbed()
    .setDescription("**All moderation commands**")
    .addFields(
        { name: ""+ guildPrefix +"ban", value: "Command to ban users! ```Example usage: "+ guildPrefix +"ban @Aspoleczny 1h reason ```" },
        { name: ""+ guildPrefix +"unban", value: "Command to unban users! ```Example usage: "+ guildPrefix +"unban <user id>```" },
        { name: ""+ guildPrefix +"mute", value: "Command to mute users! ```Example usage: "+ guildPrefix +"mute @Aspoleczny 1h reason```" },
        { name: ""+ guildPrefix +"unmute", value: "Command to unmute users! ```Example usage: "+ guildPrefix +"unmute @Aspoleczny```" },
        { name: ""+ guildPrefix +"clear", value: "Command to clear message! ```Example usage: "+ guildPrefix +"unmute @Aspoleczny```" },
        { name: ""+ guildPrefix +"giveaway", value: "Command to make giveaway! ```Example usage: "+ guildPrefix +"giveaway <time> <ammount of winner> <reward>```" },

    )
    .setTimestamp()
    const helputil = new Discord.MessageEmbed()
    .setDescription(`**All Commands**`)
    .addFields(
      { name: ""+ guildPrefix +"server", value: "Command to check informations from server! ```Example usage: "+ guildPrefix +"serverinfo ```" },
      { name: ""+ guildPrefix +"user", value: "Command to check informations about user! ```Example usage: "+ guildPrefix +"userinfo @Aspoleczny```" },
      { name: ""+ guildPrefix +"bot", value: "Command to check informations about bot! ```Example usage: "+ guildPrefix +"bot```" },
      { name: ""+ guildPrefix +"prefix", value: "Command to check prefix on server! ```Example usage: "+ guildPrefix +"prefix```" },


    )
    .setTimestamp()
    const helpsettings = new Discord.MessageEmbed()
    .setDescription(`**All Commands**`)
    .addFields(
      { name: ""+ guildPrefix +"setprefix", value: "Command to set prefix on server! ```Example usage: "+ guildPrefix +"setprefix !```" },
      { name: ""+ guildPrefix +"welcome", value: "Command to set welcome channel on server! ```Example usage: "+ guildPrefix +"setprefix !```" },
      { name: ""+ guildPrefix +"exit", value: "Command to set goodbye channel on server! ```Example usage: "+ guildPrefix +"setprefix !```" },
      { name: ""+ guildPrefix +"support", value: "Command to view bot help server!! ```Example usage: "+ guildPrefix +"support```" },

    )
    .setTimestamp()
    
    const row = new disbut.MessageActionRow()
    .addComponent(helpmodb)
    .addComponent(helputilb)
    .addComponent(helpsettingsb)
    .addComponent(economyb)
    const msg = await message.channel.send(help1, { components: [row]})
    client.on('clickButton', async button => {
        if (button.id == 'helpmodb') {
           msg.edit(helpmod, { components: [row]})
           button.reply.defer()
        }
      })
      client.on('clickButton', async button => {
        if (button.id == 'helputilb') {
           msg.edit(helputil, { components: [row]})
           button.reply.defer()
        }
      })
      client.on('clickButton', async button => {
        if (button.id == 'helpsettingsb') {
           msg.edit(helpsettings, { components: [row]})
           button.reply.defer()
        }
      })
    
  

}}