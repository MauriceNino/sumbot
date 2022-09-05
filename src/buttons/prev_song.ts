import { getMusicQueue } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'prev_song',
  executor: interaction => {
    interaction.deferReply();
    const queue = getMusicQueue(interaction.guildId);
    queue.back();
    interaction.deleteReply();
  },
} as Button;
