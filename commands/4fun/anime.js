const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
const aq = require('animequote');
const fetch = require("node-fetch")
const { kolor, defaultPrefix } = require('../../config.json');
const prefix = require('discord-prefix');


module.exports =  {
  name: "anime",
  description: "Informacje o anime",
  usage: "anime <name>",
  execute(client, message, args) {
    message.delete()
    const author = message.author

    let guildPrefix = prefix.getPrefix(message.guild.id);
    if (!guildPrefix) guildPrefix = defaultPrefix;
    const corect = new Discord.MessageEmbed()
    .setColor(`${kolor}`)
    .setTitle(`Incorrect command usage`)
    .setDescription("**Correct usage:**\n ```"+ guildPrefix +"anime <anime name>```")
    .addField("```Example usage```", "``"+ guildPrefix +"anime School DxD``", true)
    .addField("```Needs permision to use```", "``NONE``", true)
    .setTimestamp()
    .setFooter(`${author.username}`, author.avatarURL())
   if (!args[0]) {
     return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));  
      
    }
        const search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`No results found for **${search}**!`);
            }
          
          const anime = result[0]

            let embed = new Discord.MessageEmbed()
                .setColor(kolor)
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
            
                .setThumbnail(anime.posterImage.original, 100, 200);
          

            return message.channel.send({ embed })
        }).catch(err => {
            console.log(err) //cathing error
            return message.channel.send(`No results found for **${search}**!`);
        });
    }

}