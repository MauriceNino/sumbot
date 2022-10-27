import { SlashCommandBuilder } from 'discord.js';
import { noReply } from '../helpers';
import { getMusicQueue } from '../music';
import { Command } from '../types';

module.exports = {
  command: new SlashCommandBuilder()
    .setName('play')
    .setDescription(
      'Plays any title or playlist from the following services: Youtube, Youtube Music, Soundcloud'
    )
    .addStringOption(o =>
      o
        .setName('url')
        .setDescription('URL of the title or playlist')
        .setRequired(true)
    ),
  executor: interaction => {
    const queue = getMusicQueue(interaction.guild.id);
    const requestingUser = interaction.user.id;
    noReply(interaction);
  },
} as Command;
