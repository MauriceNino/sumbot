import { getMusicQueue } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'shuffle_queue',
  executor: interaction => {
    interaction.deferReply();
    const queue = getMusicQueue(interaction.guildId);
    queue.shuffle();
    interaction.deleteReply();
  },
} as Button;
