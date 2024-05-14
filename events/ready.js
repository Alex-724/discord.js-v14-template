// This code is part of the https://github.com/Alex-724/discord.js-v14-template repository
// Copyright (c) [2024] [Alex-724]

module.exports = {
    name: 'ready', // Event name: ready
    once: true, // Event should only be triggered once
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`); // Log the bot's tag when the bot is ready
        await client.setSlashCommands(); // Set slash commands for all guilds
        const { name, status } = client.config.botactivity; // Destructure the botactivity object from the config file
        client.user.setPresence({ activities: [{ name }], status }); // Set the bot's activity
    },
};