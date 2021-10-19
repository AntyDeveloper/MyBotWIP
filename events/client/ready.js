const { defaultPrefix, wersja, kolor } = require('../../config.json');
const os = require('os')
const discord = require('discord.js');

module.exports =  async (Discord, client) => {
 

    const serwery = `${client.guilds.cache.size}`

    const activities_list = [
    `| Prefix 🔧 ${defaultPrefix} |`, 
    `| Servers 📃 ${serwery} |`,
    `| Version 📚 ${wersja} |`,
    `| Help commands 📄 ${defaultPrefix}help |` 
      ]; 
    console.log(`${client.user.tag} on!`);
    let i = 0;
    const embed = new discord.MessageEmbed()
  .setColor(`${kolor}`)
  .setDescription(`<:online:899810971495841802> **Bot is already on!**`)
  .addField(`Actualy bot ping`, `1`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
    const channel = client.channels.cache.find(ch => ch.id === "898227134722625567")
    channel.bulkDelete(20)
    channel.send('╭🌿 ～・・・・・ʚ 🌸 ɞ ・・・・・ ～ 🌿╮').then(msg => {
      
    const embed1 = new discord.MessageEmbed()
    .setColor(kolor)
    .setDescription(`<:online:899810971495841802> **Bot is already online!**`)
    .addField(`╭ Bot ping`, `🏓 ${Date.now() - msg.createdTimestamp}`, true)
    .addField(`╭ Bot invite`, `♥ link`, true)
    .addField(`╭ Bot changelog`, `🗒 <#898227133963448421>`, true)
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    const id = msg.id
    msg.channel.send(embed1)
    msg.channel.send('╰🌿 ～・・・・・ʚ 🌸 ɞ ・・・・・ ～ 🌿╯ ')
    })
 
    setInterval(() => {
        client.user.setActivity(activities_list[i++ % activities_list.length], { type: 'PLAYING' }); 
    }, 30000); // 
  
  };