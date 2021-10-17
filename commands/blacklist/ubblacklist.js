const Discord = require('discord.js');
const db = require("quick.db");

const bldd = new db.table('bldd');
const bldd2 = new db.table('bldd2');
const blddperms = new db.table('blddperms');

module.exports = {
    name: "unblacklist",
    aliases: ["unbl"],
    usage: ["unblacklist @oznacz lub id (powód blacklisty)"],
    async execute(client, message, args) {
        message.delete()
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const member1 = message.guild.members.cache.get(args[0])
        if (!message.guild) return message.channel.send('Ta komenda może zostać użyta tylko na serwerze')
        const fetched = message.guild.members.cache.get(m => m.id === blddperms.get(`blacklist_${member1}`));
         if (message.author != blddperms.get(`blacklist_${member1}`)) return message.channel.send('❌ Nie masz permisji aby użyć tej komendy!').then((m) => m.delete({ timeout: 15000 }));  
        if (!fetched)  {
            
        if (args.length < 2) return message.channel.send('Nie poprawnie użyłeś komendy!').then((m) => m.delete({ timeout: 15000 })); 
        const dev = await client.users.fetch(member1);
        let thanos = client.users.fetch(member1);
        thanos.then(function(result1) {
            var imgURL = result1.displayAvatarURL();

        let powod = args.slice(1).join(" ")
        bldd.delete(`blacklist_${member}}`, true)
        bldd2.delete(`blacklist_${member1}}`, true)


        let memberd = message.author.tag
        client.guilds.cache.forEach(a => a.members.cache.get(member1).ban())
        const embed1 = new Discord.MessageEmbed()
        .setColor(`red`)
        .setDescription(`${member} otrzymał unblackliste z powodem » **${powod}**`)
        .setThumbnail(imgURL)
        .setFooter(`${memberd} » blackliste zdjął dla ${dev.tag}`)


        message.channel.send(embed1)      
    });
    }   }
}