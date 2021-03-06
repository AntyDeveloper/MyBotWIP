const db = require("quick.db");
const wcha = new db.table('wcha');
const autorole = new db.table('autorole');



module.exports =  async (Discord, client, member) => {
    const welcome = new Discord.MessageEmbed()
    .setColor(wcha.get(`${member.guild.id}.color`))
    .setTitle(`Welcome on: ${member.guild.name}!`)
    .setDescription(`${member.user}, ` + wcha.get(`${member.guild.id}.text`))
    //.addField('member count', member.guild.memberCount)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    const channel = member.guild.channels.cache.find(ch => ch.id === wcha.get(`${member.guild.id}.channel`))
    const name = autorole.get(`${member.guild.id}.roleName`)
    if(name)
    member.roles.add(name)
    if(channel) {
    channel.send(member.user).then((m) => m.delete({ timeout: 3000 }))
    channel.send(welcome)
    }  else {
        console.log('error')
    }
}