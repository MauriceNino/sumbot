import { Routes } from 'discord.js';
import { getMusicQueue, updateMessage } from './music';
import { CLIENT_ID } from './settings';
import { buttonsMap, client, commandsMap, rest } from './setup';

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    commandsMap[interaction.commandName]?.executor(interaction);
  }

  if (interaction.isButton()) {
    buttonsMap[interaction.customId]?.executor(interaction);
  }
});

client.on('guildCreate', async guild => {
  const queue = getMusicQueue(guild.id);
  updateMessage(queue);
});

rest
  .put(Routes.applicationCommands(CLIENT_ID), {
    body: Object.values(commandsMap).map(c => c.command.toJSON()),
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
