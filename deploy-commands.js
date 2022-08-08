import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config.json' assert { type: 'json' };

const __dirname = path.resolve();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  // const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config['token']);

rest
  .put(Routes.applicationGuildCommands(config['clientId'], config['guildId']), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
