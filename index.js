require('dotenv').config();
const Client = require('./base/Client'); // Importing the CustomClient class
const client = new Client(); // Creating a new instance of the CustomClient class
const fs = require('fs'); // Importing the fs module
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // Reading the events folder
// event handler start
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
// event handler end

const commandFolders = fs.readdirSync('./commands'); // Reading the commands folder
// command handler start
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command); // Setting the command name and data to the commands collection
        if (command.slashCommands.enabled) {
            client.slashCommands.push(command.slashCommands.data); // Pushing the slash command data to the slashCommands array
        }
    }
}
// command handler end
client.login(client.config.token); // Logging in to Discord with the bot token