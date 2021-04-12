import { CommandHandler } from './command-handler';
import { Logger } from './utils/logger';
import { COMMAND_PREFIX } from './settings';

import { Client } from 'discord.js';

import * as cinit from './commands/commands-init';

const LOG_LEVEL = process.env.LOG_LEVEL || 'DEBUG';
const DISCORD_API_KEY = process.env.DISCORD_API_KEY;

console.log('Environment list: ', process.env);

const client = new Client();

client.once('ready', async () => {
  console.log('Telescope Bot successfully started');
  
  await client.user.setActivity({
    type: 'WATCHING',
    name: `for stars | ${COMMAND_PREFIX} help`
  });
});

client.on('message', message => {
  const messageContent = message.content.trimStart();

  if (messageContent.startsWith(COMMAND_PREFIX)) {
    const loggerInstance = new Logger(LOG_LEVEL);

    // Handle command
    const cmdHandler = new CommandHandler(loggerInstance);
    cmdHandler.handle(client, message);
  }
});

client.login(DISCORD_API_KEY);
cinit.init();