import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Button } from '../types';

module.exports = {
  button: 'add_song',
  executor: interaction => {
    const modal = new ModalBuilder()
      .setCustomId('add_song_modal')
      .setTitle('Add Song');

    const songInput = new TextInputBuilder()
      .setCustomId('song_url')
      .setLabel('URL/Name of your Song or Playlist')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().addComponents(songInput) as any;

    modal.addComponents(row);
    interaction.showModal(modal);
  },
} as Button;
