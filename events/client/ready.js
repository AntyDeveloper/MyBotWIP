const { defaultPrefix, wersja, kolor } = require('../../config.json');

module.exports =  async (Discord, client) => {
 
  const arldd = new Discord.MessageEmbed()
  .setColor(`${kolor}`)
  .setDescription(`<:online:899810971495841802> **Bot is already on!**`)
  .setTimestamp()
  .setFooter(`${client.user.username}`, client.user.avatarURL())
    const serwery = `${client.guilds.cache.size}`
  
    const activities_list = [
    `| Prefix 🔧 ${defaultPrefix} |`, 
    `| Servers 📃 ${serwery} |`,
    `| Version 📚 ${wersja} |`,
    `| Help commands 📄 ${defaultPrefix}help |` 
      ]; 
    console.log(`${client.user.tag} on!`);
    let i = 0;
    client.channels.cache.get("898227134722625567").send(arldd)
    
    setInterval(() => {
        client.user.setActivity(activities_list[i++ % activities_list.length], { type: 'PLAYING' }); 
    }, 30000); // 
  
  };