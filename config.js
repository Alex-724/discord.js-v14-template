module.exports = {
    token:  process.env.token || '', // Your bot token
    owners: ['1072592763427754034'], // Your Discord ID
    cooldown: 3, // Default cooldown for commands
    botactivity: {
        name: 'your commands', // Activity name
        status: 'idle' // Activity status {online, idle, dnd} Note It need time to change
    }
};
