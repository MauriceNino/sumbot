import { SlashCommandBuilder } from 'discord.js';
import { noReply } from '../helpers';
import { getMusicQueue } from '../music';
import { Command } from '../types';

module.exports = {
  command: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music bot and resets the queue'),
  executor: interaction => {
    const queue = getMusicQueue(interaction.guild.id);
    queue?.stop();
    noReply(interaction);
  },
} as Command;
