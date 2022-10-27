import { getMusicQueue, updateMessage } from '../music';
import { Button } from '../types';

module.exports = {
  button: 'play_pause',
  executor: async interaction => {
    interaction.deferReply();

    const queue = getMusicQueue(interaction.guild.id);
    await queue.pauseOrUnpause(interaction.user);
    await updateMessage(queue);

    interaction.deleteReply();
  },
} as Button;
