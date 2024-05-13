// This code is part of the https://github.com/Alex-724/discord.js-v14-template repository
// Copyright (c) [2024] [Alex-724]

const { PermissionsBitField: {Flags: Permission}, ApplicationCommandOptionType } = require('discord.js'); // Importing the necessary classes and types from discord.js
module.exports = {
    name: 'clear', // The name of the command
    description: 'Clear messages', // The description of the command
    cooldown: 3, // The command cooldown in seconds
    guildOnly: true, // Whether the command should only be used in guilds
    ownerOnly: false, // Whether the command should only be used by the owner
    nsfw: false, // Whether the command should only be used in NSFW channels
    userPermission: [Permission.ManageMessages], // The required user permissions to use the command
    botPermission: [Permission.ManageMessages], // The required bot permissions to execute the command
    slashCommands: { // The slash command data
        enabled: true,
        data: {
            name: 'clear',
            description: 'Clear messages',
            options: [
                {
                    name: 'amount',
                    type: ApplicationCommandOptionType.Integer,
                    description: 'Amount of messages to clear',
                    required: true
                },
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'User to clear messages',
                    required: false
                }
            ]
        }
    },
    async execute(interaction) {
        const msg = await interaction.reply({ content: 'Clearing messages...', ephemeral: true });
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');
        if (amount > 100) return msg.edit({ content: 'You can only clear 100 messages at a time!', ephemeral: true })
        if (amount < 1) return msg.edit({ content: 'You must clear at least 1 message!', ephemeral: true });
        try {

            if (user) {
                interaction.channel.messages.fetch({ limit: amount }).then(messages => {
                    const userMessages = messages.filter(m => m.author.id === user.id);
                    interaction.channel.bulkDelete(userMessages).then(() => {
                        msg.edit({ content: `Successfully cleared ${userMessages.size} messages from ${user.tag}`, ephemeral: true });
                    }).catch(console.error);
                }).catch(console.error);
            } else {
                interaction.channel.bulkDelete(amount).then(() => {
                    msg.edit({ content: `Successfully cleared ${amount} messages`, ephemeral: true });
                }).catch(console.error);
            }
        } catch (error) {
            console.error(error);
            msg.edit({ content: 'There was an error while clearing messages!', ephemeral: true });
        }
    },
};