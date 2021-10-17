const { defaultPrefix, wersja } = require('../../config.json');

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
    setInterval(() => {
        client.user.setActivity(activities_list[i++ % activities_list.length], { type: 'PLAYING' }); 
    }, 30000); // 
  };