const { Collection, PermissionsBitField: { Flags: Permission } } = require('discord.js'); // Importing the Collection class from discord.js
module.exports = {
    name: 'interactionCreate', // Event name: interactionCreate
    once: false, // Event should only be triggered multiple times
    async execute(interaction, client) {
        if (!interaction.isCommand()) return; // If the interaction is not a command, return
        const command = client.commands.get(interaction.commandName); // Get the command from the commands Collection
        if (!command) return; // If the command does not exist, return
        if (command.guildOnly && !interaction.inGuild()) return interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true }); // If the command is guild only and the interaction is not in a guild, return
        if (command.ownerOnly && !client.config.owners.includes(interaction.user.id)) return interaction.reply({ content: 'This command can only be used by the bot owner!', ephemeral: true }); // If the command is owner only and the interaction user is not the bot owner, return
        if (command.nsfw && !interaction.channel.nsfw) return interaction.reply({ content: 'This command can only be used in a NSFW channel!', ephemeral: true }); // If the command is nsfw and the interaction channel is not a nsfw channel, return
        // Check user and bot permissions
        if (interaction.inGuild()) { 
            let need = [];
            if (command.userPermission.length > 0) {
                command.userPermission.forEach(permission => {
                    if (
                        !interaction.guild.members.cache
                            .get(interaction.member.user.id)
                            .permissions.has(permission)
                    ) {
                        need.push(Object.keys(Permission).find(p => Permission[p] === permission))
                    }
                });
            }
            if (need.length > 0) return interaction.reply({ content: `I need the following permissions to run this command: ${need.map(p => `\`${p}\``).join(', ')}`, ephemeral: true }); // If the user does not have the required permissions, return
            need = [];
            if (command.botPermission.length > 0) {
                command.botPermission.forEach(permission => {
                    if (
                        !interaction.guild.members.me.permissions.has(permission)
                    ) {

                        need.push(Object.keys(Permission).find(p => Permission[p] === permission))
                    }
                });
            }
            if (need.length > 0) return interaction.reply({ content: `You need the following permissions to run this command: ${need.map(p => `\`${p}\``).join(', ')}`, ephemeral: true }); // If the bot does not have the required permissions, return
        }
        // Cooldowns System
        if (command.cooldown) {
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || client.config.cooldown) * 1000;
            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true }); // Reply with a cooldown message
                }
            }
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        }
        try {
            await command.execute(interaction, client); // Execute the command
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); // Reply with an error message
        }
    },
};