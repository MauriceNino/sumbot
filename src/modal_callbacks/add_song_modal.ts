import { getMusicQueue, updateMessage } from '../music';
import { Modal } from '../types';

module.exports = {
  modal: 'add_song_modal',
  executor: async interaction => {
    interaction.deferReply();

    const songUrl = interaction.fields.getTextInputValue('song_url');
    const queue = getMusicQueue(interaction.guild.id);
    await queue.addSong(interaction.user, songUrl);
    await updateMessage(queue);

    interaction.deleteReply();
  },
} as Modal;
