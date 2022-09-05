import { getMusicQueue } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'play_pause',
  executor: interaction => {
    interaction.deferReply();
    const queue = getMusicQueue(interaction.guildId);
    queue.pauseOrUnpause();
    interaction.deleteReply();
  },
} as Button;
