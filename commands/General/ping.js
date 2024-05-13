// This code is part of the https://github.com/Alex-724/discord.js-v14-template repository
// Copyright (c) [2024] [Alex-724]

const { PermissionsBitField: {Flags: Permission}, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'ping', // The name of the command
    description: 'Ping!', // The description of the command
    cooldown: 5, // The command cooldown in seconds
    guildOnly: false, // Whether the command should only be used in guilds
    ownerOnly: false, // Whether the command should only be used by the owner
    nsfw: false, // Whether the command should only be used in NSFW channels
    userPermission: [], // The required user permissions to use the command
    botPermission: [], // The required bot permissions to execute the command
    slashCommands: { // The slash command data
        enabled: true,
        data: {
            name: 'ping',
            description: 'Ping!'
        }
    },
    execute(interaction) {
        interaction.reply('Pong!');
    },
};