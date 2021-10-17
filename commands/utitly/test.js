const Discord = require('discord.js');

module.exports = {
    name: "test",
    aliases: [],
    async execute(client, message, args) {
        message.delete()
        let id = '534781539691659264'

        "create a variable called id"
        "then inside your client message statement change id ->  id = message.id"
        client.on('message', message => {
          id = message.id
        });
        "inside your command type  message.fetch(id).then(msg => msg.delete());"
          
              message.fetch(id).then(msg => msg.delete());      
        
message.channel.send("Message with a button!", button);
    }   
}