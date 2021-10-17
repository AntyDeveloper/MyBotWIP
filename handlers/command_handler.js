const fs = require('fs');

module.exports = (client, Discord, message) => {
    
    const catalogues = fs.readdirSync(`./commands/`).filter(file => !file.startsWith('.'))
    const disbut = require("discord-buttons");
    disbut(client);

    for (const catalogue of catalogues) {
        catalogues.forEach(() => {
            const load_dir = (dirs) =>{
                const command_files = fs.readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'))

                for (const file of command_files) {
                    const command = require(`../commands/${dirs}/${file}`)

                    if (command.name) {
                        client.commands.set(command.name, command);
                    } else {
                        continue;
                    }
                }
            }
            [catalogue].forEach(e => load_dir(e)); 
        })
    }
}
