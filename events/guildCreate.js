// This code is part of the https://github.com/Alex-724/discord.js-v14-template repository
// Copyright (c) [2024] [Alex-724]

module.exports = {
    name: 'guildCreate', // Event name: guildCreate
    once: false, // Event should only be triggered once
    async execute(guild, client) {
        await client.setSlashCommands(guild); // Set slash commands for the guild
    },
};