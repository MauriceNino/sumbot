import { CommandHandler } from './command-handler';
import { Logger } from './utils/logger';

import { Client } from 'discord.js';
import { ServerHandling } from './commands/server-handling';

const COMMAND_PREFIX = '>>';

const LOG_LEVEL = process.env.LOG_LEVEL || 'DEBUG';
const DISCORD_API_KEY = process.env.DISCORD_API_KEY;

const client = new Client();

// Need to be initialized
new ServerHandling();

client.once('ready', () => {
  console.log('Sum Bot successfully started');
  client.user.setActivity({
    type: 'WATCHING',
    name: 'You'
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