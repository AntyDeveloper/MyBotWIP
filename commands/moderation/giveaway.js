const Discord = require('discord.js')
const moment = require('moment');
const { prefix } = require('../../config.json');


module.exports = {
	name: 'giveaway',
    aliases: ['g-create'],
	description: 'Tworzy giveaway-a',
	execute(client, message, args) {
        const author = message.author
        let guildPrefix = prefix.getPrefix(message.guild.id);
        if (!guildPrefix) guildPrefix = defaultPrefix;
        let time = args[0]
        let zwycięzcy = args[1]
        let prize = args.slice(2).join(" ");
        const permoff = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setDescription(`<:Cross:847905173010382858> **You dont have permission to use this command!**`)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(permoff).then((m) => m.delete({ timeout: 5000 }));     
        if (!args[0] || !args[1] || !prize ) return message.channel.send(corect).then((m) => m.delete({ timeout: 5000 }));        
        const corect = new Discord.MessageEmbed()
        .setColor(`${kolor}`)
        .setTitle(`Incorrect command usage`)
        .setDescription("**Correct usage:**\n ```"+ guildPrefix +"giveaway <time> <ammount of winner> <reward>```")
        .addField("```Example usage```", "``"+ guildPrefix +"giveaway 1h 1 reward``", true)
        .addField("```Needs permision to use```", "``ADMINISTRATOR``", true)
        .setTimestamp()
        .setFooter(`${author.username}`, author.avatarURL())


        if (!time) return message.channel.send('You did not specify the time');
        if (!time.endsWith("d") && !time.endsWith("h") && !time.endsWith("m")) return message.channel.send(`The time shall be specified in days (d) or in hours (h) or in minutes (m)`);
        if (!zwycięzcy) return message.channel.send('You did not specify the number of winners (from 1 to 10)');
        if (isNaN(zwycięzcy)) return message.channel.send('The number of people must be a number, did you know?');
        if (zwycięzcy < 1 || zwycięzcy > 10) return message.channel.send('Wrong number of winners (from 1 to 10)');
        if (!prize) return message.channel.send('You did not specify the prize');

        if (time.endsWith("d")) time = (time.slice(0, -1) * 86400000).toFixed(0)
        if (time.endsWith("h")) time = (time.slice(0, -1) * 3600000).toFixed(0)
        if (time.endsWith("m")) time = (time.slice(0, -1) * 60000).toFixed(0)

        if (isNaN(time)) return message.channel.send('Time must be a number, did you know?');
        if (time > 1209600000) return message.channel.send('The maximum time is 14d');
        if (time < 600000) return message.channel.send('The minimum time is 10m');

        const timeEnd = Date.now() + parseInt(time)
        const end = moment(timeEnd).format('HH:mm:ss DD/MM/YYYY');

        const embed1 = new Discord.MessageEmbed()
        .setTitle('<:gift1:845982652242984960> New giveaway! <:gift1:845982652242984960>')
        .setColor('BLUE')
        .setDescription(`Host: ${message.author}\nPrize: **${prize}**\nDuration: ${args[0]}\nEnds at: *${end}*`)
        .setFooter(`Aby anulować giveaway Host musi zareagować ❌`)

        const embed2 = new Discord.MessageEmbed()
        .setTitle("Giveaway completed!")
        .setColor("RED")
        .setDescription("No winners, nobody took part in the giveaway :(")
        .setFooter(`Ends at: ${end}`)

        const embed3 = new Discord.MessageEmbed()
        .setTitle("Giveaway completed!")
        .setColor("GREEN")
        .setFooter(`Ends at: ${end}`)

        const embed4 = new Discord.MessageEmbed()
        .setTitle("Giveaway cancelled :c")
        .setColor("ORANGE")
        .setDescription(`Host: ${message.author}\nPrize: **${prize}**`)

        message.delete()
        message.channel.send(embed1).then(m => {
            m.react("🎉")
            m.react("❌")

            const filter1 = (reaction, user) => {
                return ["❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector1 = m.createReactionCollector(filter1, { time: time });

            collector1.on('collect', collected => {
                let emoji = collected.emoji.name;
    
                if (emoji === "❌") {
                    message.channel.send(`${message.author}, Are you sure you want to close this giveaway?`).then(msg => {
                        msg.react("✅")
                        msg.react("❌")
                        
                        const filter2 = (reaction, user) => {
                            return ["❌", "✅"].includes(reaction.emoji.name) && user.id === message.author.id;
                        };

                        const collector2 = msg.createReactionCollector(filter2, { max: 1, time: 60000 });

                        collector2.on('end', (collected, reason, user) => {
                            if (reason === 'time') {
                                msg.delete()
                            } else {
                                let userReaction = collected.array()[0];
                                let emoji = userReaction._emoji.name;
                                
                                if (emoji === "✅") {
                                    embed4.setFooter(`Giveaway cancelled by: ${message.author.tag}`)
                                    m.edit(embed4)
                                    collector1.stop()
                                    msg.edit("Giveaway cancelled")
                                    m.reactions.removeAll()
                                    return msg.delete({ timeout: 3000 })
                                } else if (emoji === "❌") {
                                    msg.delete()
                                    m.reactions.cache.get("❌").remove(user).then(() => {
                                        m.react("❌")
                                    })
                                }
                            }
                        });
                    });
                }
                
            })

            setTimeout(() => {
                if (m.reactions.cache.get("🎉").count <= 1) {
                    m.edit(embed2)
                } else {
                    const winners = m.reactions.cache.get("🎉").users.cache.filter((b) => !b.bot).random(zwycięzcy).join("\n")

                    if (zwycięzcy > 1 && m.reactions.cache.get("🎉").count > 2) {  
                        message.channel.send(`The winners of the giveaway are:**${winners}: **${prize}**!`)
                        embed3.setDescription(`Prize: **${prize}**Winners:$${winners}** All participants: ${m.reactions.cache.get("🎉").count - 1}`)
                    } else {
                        message.channel.send(`The winner of the giveaway is:**${winners} **${prize}**.`)
                        embed3.setDescription(`Prize: **${prize}**Winner:${winners}** All participants: ${m.reactions.cache.get("🎉").count - 1}`)
                    }
                    m.edit(embed3)
                    m.reactions.removeAll()
                }
            }, time)
        })
    }
}