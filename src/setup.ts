import crypto from 'crypto';
import { ActivityType, Client, GatewayIntentBits, REST } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { getMusicQueue, updateMessage } from './music';
import { DISCORD_API_KEY, IS_DEV } from './settings';
import { Button, Command, Modal } from './types';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
export const rest = new REST({ version: '10' }).setToken(DISCORD_API_KEY);
client.login(DISCORD_API_KEY);

const getMap = <T>(subPath: string, nameExtractor: (item: T) => string) => {
  const joinedPath = path.join(__dirname, subPath);
  const items = readdirSync(joinedPath).map(
    f => require(path.join(joinedPath, f)) as T
  );
  return items.reduce<Record<string, T>>(
    (acc, c) => ({ ...acc, [nameExtractor(c)]: c }),
    {}
  );
};

export const commandsMap = getMap<Command>('commands', c => c.command.name);
export const buttonsMap = getMap<Button>('buttons', c => c.button);
export const modalCallbacksMap = getMap<Modal>('modal_callbacks', c => c.modal);

client.once('ready', () => {
  client.user.setActivity({
    type: ActivityType.Watching,
    name: IS_DEV
      ? ` ${crypto.randomBytes(20).toString('hex')}`
      : 'the starry night sky',
  });

  client.guilds.cache.forEach(async guild => {
    const queue = getMusicQueue(guild.id);

    await queue.addSong(client.user, 'Eminem Till I Collapse', false);

    updateMessage(queue);
  });
});
