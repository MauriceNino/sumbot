import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

module.exports = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  executor: interaction => {
    interaction.reply('pong');
  },
} as Command;
