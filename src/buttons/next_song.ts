import { getMusicQueue } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'next_song',
  executor: interaction => {
    interaction.deferReply();
    const queue = getMusicQueue(interaction.guildId);
    queue.skip();
    interaction.deleteReply();
  },
} as Button;
