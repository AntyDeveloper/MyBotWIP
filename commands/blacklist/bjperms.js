const Discord = require('discord.js');
const db = require("quick.db");



const blddperms = new db.table('blddperms');
const { ownerid } = require('../../config.json');

module.exports = {
    name: "blperms",
    aliases: [],
    async execute(client, message, args) {
        message.delete()
        let member = message.mentions.members.first()
        const member1 = member.user.id
        const fetched = message.guild.members.cache.get(m => m.id === ownerid);

        if (message.author.id != ownerid) {
            message.channel.send('❌ Nie masz permisji aby użyć tej komendy!').then((m) => m.delete({ timeout: 15000 })); 
        } else {

        if (!fetched)  {
        blddperms.set(`blacklist_${member1}`, true)
        message.channel.send(`Nadano permisje do blacklisty!`)      
        }
    }   
}}