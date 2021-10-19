const db = require("quick.db");
const echa = new db.table('echa');

module.exports =  async (Discord, client, member) => {
    const exit = new Discord.MessageEmbed()
    .setColor(echa.get(`${member.guild.id}.color`))
    .setTitle(`Goodbye from: ${member.guild.name}!`)
    .setDescription(`${member.user}, ` + echa.get(`${member.guild.id}.text`))
    //.addField('member count', member.guild.memberCount)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
 
    const channel = member.guild.channels.cache.find(ch => ch.id === echa.get(`${member.guild.id}.channel`))
    channel.send(member.user).then((m) => m.delete({ timeout: 3000 }))

    channel.send(exit)
}