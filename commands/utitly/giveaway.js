const Discord = require('discord.js')
const moment = require('moment');
const { prefix } = require('../../config.json');


module.exports = {
	name: 'giveaway',
    aliases: ['g-create'],
	description: 'Tworzy giveaway-a',
	execute(client, message, args) {
        message.delete()
        if (!message.guild) return message.channel.send('Ta komenda może zostać użyta tylko na serwerze')
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ Nie masz permisji aby użyć tej komendy!')
        if (!args.length) return message.channel.send('Nieprawidlowe uzycie');

        let time = args[0]
        let zwycięzcy = args[1]
        let prize = args.slice(2).join(" ");

        if (!time) return message.channel.send('Nie podałeś czasu');
        if (!time.endsWith("d") && !time.endsWith("h") && !time.endsWith("m")) return message.channel.send(`Czas musi zostać podany w dniach (d) albo w godzinach (h) albo w minutach (m)`);
        if (!zwycięzcy) return message.channel.send('Nie podałeś ilości zwycięzców (od 1 do 10)');
        if (isNaN(zwycięzcy)) return message.channel.send('Liczba osób musi być liczbą, wiedziałeś/aś?');
        if (zwycięzcy < 1 || zwycięzcy > 10) return message.channel.send('Zła ilość zwycięzców (od 1 do 10)');
        if (!prize) return message.channel.send('Nie podałeś nagrody');

        if (time.endsWith("d")) time = (time.slice(0, -1) * 86400000).toFixed(0)
        if (time.endsWith("h")) time = (time.slice(0, -1) * 3600000).toFixed(0)
        if (time.endsWith("m")) time = (time.slice(0, -1) * 60000).toFixed(0)

        if (isNaN(time)) return message.channel.send('Czas musi być liczbą, wiedziałeś/aś?');
        if (time > 1209600000) return message.channel.send('Maxymalny czas wynosi 14d');
        if (time < 600000) return message.channel.send('Minimalny czas wynosi 10m');

        const timeEnd = Date.now() + parseInt(time)
        const end = moment(timeEnd).format('HH:mm:ss DD/MM/YYYY');

        const embed1 = new Discord.MessageEmbed()
        .setTitle('<:gift1:845982652242984960> Nowy giveaway! <:gift1:845982652242984960>')
        .setColor('BLUE')
        .setDescription(`Host: ${message.author}\nNagroda: **${prize}**\nCzas trwania: ${args[0]}\nKończy się o: *${end}*`)
        .setFooter(`Aby anulować giveaway Host musi zareagować ❌`)

        const embed2 = new Discord.MessageEmbed()
        .setTitle("Giveaway zakończony!")
        .setColor("RED")
        .setDescription("Brak zwycięzców, nikt nie wziął udziału w giveaway-u :(")
        .setFooter(`Zakończono o: ${end}`)

        const embed3 = new Discord.MessageEmbed()
        .setTitle("Giveaway zakończony!")
        .setColor("GREEN")
        .setFooter(`Zakończono o: ${end}`)

        const embed4 = new Discord.MessageEmbed()
        .setTitle("Giveaway anulowany :c")
        .setColor("ORANGE")
        .setDescription(`Host: ${message.author}\nNagroda: **${prize}**`)

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
                    message.channel.send(`${message.author}, Czy jesteś pewnien że chcesz zamknąć tego giveaway-a?`).then(msg => {
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
                                    embed4.setFooter(`Giveaway anulowany przez: ${message.author.tag}`)
                                    m.edit(embed4)
                                    collector1.stop()
                                    msg.edit("Giveaway został anulowany")
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
                        message.channel.send(`Zwycięzcami giveaway-u zostali:\n${winners}\nWygrali: **${prize}**!`)
                        embed3.setDescription(`Nagroda: **${prize}**\nZwycięzcy:\n${winners}\nWszyscy uczestnicy: ${m.reactions.cache.get("🎉").count - 1}`)
                    } else {
                        message.channel.send(`Zwycięzcą giveaway-u został:\n${winners}\nWygrał: **${prize}**`)
                        embed3.setDescription(`Nagroda: **${prize}**\nZwycięzca: ${winners}\nWszyscy uczestnicy: ${m.reactions.cache.get("🎉").count - 1}`)
                    }
                    m.edit(embed3)
                    m.reactions.removeAll()
                }
            }, time)
        })
    }
}