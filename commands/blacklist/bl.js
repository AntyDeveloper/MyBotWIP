const Discord = require('discord.js');
const db = require("quick.db");

const bldd = new db.table('bldd');
const bldd2 = new db.table('bldd2');
const bldd3 = new db.table('bldd3');
const blddperms = new db.table('blddperms');

module.exports = {
    name: "blacklist",
    aliases: ["bl"],
    usage: ["blacklist @oznacz lub id (powód blacklisty)"],
    async execute(client, message, args) {
        message.delete()
        let member = message.mentions.members.first()

        const member1 = member.user.id
        if (!message.guild) return message.channel.send('Ta komenda może zostać użyta tylko na serwerze')
        const fetched = message.guild.members.cache.get(m => m.id === blddperms.get(`blacklist_${member1}`));
         if (message.author.id !== fetched) {
            message.channel.send('❌ Nie masz permisji aby użyć tej komendy!').then((m) => m.delete({ timeout: 15000 }));  
         } else {
        if (!fetched)  {
            
        if (args.length < 2) return message.channel.send('Nie poprawnie użyłeś komendy!').then((m) => m.delete({ timeout: 15000 })); 
        const member1 = member.user.id
        const dev = await client.users.fetch(member1);
        let thanos = client.users.fetch(member1);
        thanos.then(function(result1) {
            var imgURL = result1.displayAvatarURL();

        let powod = args.slice(1).join(" ")
        bldd.set(`blacklist_${member}}`, true)
        bldd2.set(`blacklist_${member1}}`, true)
        bldd3.set(`blacklist_${powod}}`, true)


        let memberd = message.author.tag
        client.guilds.cache.forEach(a => a.members.cache.get(member1).ban())
        const embed1 = new Discord.MessageEmbed()
        .setColor(`red`)
        .setDescription(`${member} otrzymał blackliste z powodem » **${powod}**`)
        .setThumbnail(imgURL)
        .setFooter(`${memberd} » nałożył blackliste na ${dev.tag}`)


        message.channel.send(embed1)      
    });
    }   }}
}