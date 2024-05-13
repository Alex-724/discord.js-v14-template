# Discord.js v14 Template

This is a template for creating a Discord bot using discord.js v14.

## Features

- Event handling
- Command handling
- Slash command support

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/Alex-724/discord.js-v14-template.git
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your bot token:
   ```
   TOKEN=your-bot-token
   ```
4. Run the bot:
   ```
   node index.js
   ```

## Adding Commands

To add a command, create a new file in the `commands` directory. The file should export an object with the following properties:

- `name`: The name of the command.
- `description`: A description of what the command does.
- `cooldown`: The command cooldown in seconds.
- `guildOnly`: Whether the command should only be used in guilds.
- `ownerOnly`: Whether the command should only be used by the owner.
- `nsfw`: Whether the command should only be used in NSFW channels.
- `userPermission`: An array of required user permissions to use the command.
- `botPermission`: An array of required bot permissions to execute the command.
- `slashCommands`: An object containing slash command data.
   - `enabled`: Whether slash commands are enabled for this command.
   - `data`: An object containing the slash command data.
      - `name`: The name of the slash command.
      - `description`: A description of the slash command.
- `execute`: A function that gets executed when the command is used.

Example:

## Adding Events

To add an event, create a new file in the `events` directory. The file should export an object with the following properties:

- `name`: The name of the event.
- `once`: A boolean indicating whether the event should only be handled once.
- `execute`: A function that gets executed when the event is triggered.

## License

Please refer to the [LICENSE](https://github.com/Alex-724/discord.js-v14-template/blob/main/LICENSE) file for the license information.
