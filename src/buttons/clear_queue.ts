import { getMusicQueue, updateMessage } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'clear_queue',
  executor: interaction => {
    interaction.deferReply();

    const queue = getMusicQueue(interaction.guildId);
    queue.stop();
    updateMessage(queue);

    interaction.deleteReply();
  },
} as Button;
