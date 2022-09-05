import crypto from 'crypto';
import { ActivityType, Client, GatewayIntentBits, REST } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { getMusicQueue, updateMessage } from './music';
import { DISCORD_API_KEY, IS_DEV } from './settings';
import { Button, Command } from './types';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
export const rest = new REST({ version: '10' }).setToken(DISCORD_API_KEY);
client.login(DISCORD_API_KEY);

const commandsPath = path.join(__dirname, 'commands');
const commands = readdirSync(commandsPath).map(
  f => require(path.join(commandsPath, f)) as Command
);
export const commandsMap = commands.reduce<Record<string, Command>>(
  (acc, c) => ({ ...acc, [c.command.name]: c }),
  {}
);

const buttonsPath = path.join(__dirname, 'buttons');
const buttons = readdirSync(buttonsPath).map(
  f => require(path.join(buttonsPath, f)) as Button
);
export const buttonsMap = buttons.reduce<Record<string, Button>>(
  (acc, b) => ({ ...acc, [b.button]: b }),
  {}
);

client.once('ready', () => {
  client.user.setActivity({
    type: ActivityType.Watching,
    name: IS_DEV
      ? ` ${crypto.randomBytes(20).toString('hex')}`
      : 'the starry night sky',
  });

  client.guilds.cache.forEach(guild => {
    const queue = getMusicQueue(guild.id);
    updateMessage(queue);
  });
});
