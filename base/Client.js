// This code is part of the https://github.com/Alex-724/discord.js-v14-template repository
// Copyright (c) [2024] [Alex-724]

const { Client, GatewayIntentBits, Collection } = require('discord.js'); // Importing the necessary classes from discord.js

/**
 * CustomClient class that extends the Client class from discord.js
 * @extends Client
 * @property {Collection} commands - Collection of commands
 * @property {Array} slashCommands - Array of slash commands
 * @property {Collection} cooldowns - Collection of cooldowns
 * @property {Object} config - Configuration object
 * @method setSlashCommands - Method to set slash commands for the bot
 */
class CustomClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds, // for guilds
        GatewayIntentBits.GuildIntegrations // for integrations
        // Add more intents if needed
      ]
    });
    this.commands = new Collection(); // Creating a new Collection to store commands
    this.slashCommands = [] // Creating an array to store slash commands
    this.cooldowns = new Collection(); // Creating a new Collection to store cooldowns
    this.config = require('../config.js'); // Importing the configuration file
  }

  /**
   * setSlashCommands method to set slash commands for the bot
   * @param {Guild} guild - The guild to set slash commands for
   * @returns {Promise<void>}
   * @async
   * @example
   * await client.setSlashCommands();
   * await client.setSlashCommands(guild);
   */
  async setSlashCommands(guild) {
    if (!guild) {
      try {
        this.guilds.cache.forEach(async guild => {
          await guild.commands.set(this.slashCommands); // Set slash commands for the guild
        });
        console.log(`Successfully set ${this.slashCommands.length} slash commands for ${this.guilds.cache.size} guilds`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await guild.commands.set(this.slashCommands); // Set slash commands for the guild
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = CustomClient; // Exporting the CustomClient class
// Source code available at: https:github.com/Alex-724/discord.js-v14-template