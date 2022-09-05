import {
  ActionRowBuilder,
  bold,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  underscore,
} from 'discord.js';
import moment from 'moment';
import { client } from '../setup';
import { MusicQueue } from './queue';

const queues: Record<string, MusicQueue> = {};

export const updateMessage = async (queue: MusicQueue) => {
  const channel = queue.getChannel();

  const embed = new EmbedBuilder()
    .setColor(0xd742f5)
    .setTitle('David Guetta - Generic Song (Youtube Music)')
    .setThumbnail(
      'https://i.pinimg.com/originals/e5/8b/3d/e58b3dea512ce22a714aa05fe807f485.png'
    )
    .setDescription(
      `${bold(
        underscore('Queue')
      )}\n1. Shape of you - Ed Sheeran\n2. My time - Jungkook\n3. Lighters - Bruno Mars\n...`
    )
    .setFooter({
      text: `Add any song from Youtube, YT Music, or Soundcloud, using the button below. (Last updated at ${moment().format(
        'hh:mm:ss DD.MM.YYYY'
      )})`,
    })
    .setURL('https://www.google.com');

  const controlsRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('prev_song')
      .setLabel('⏴︎')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('play_pause')
      .setLabel('▶ / ||')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('next_song')
      .setLabel('⏵︎')
      .setStyle(ButtonStyle.Secondary)
  ) as any;

  const actionsRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('add_song')
      .setLabel('Add Song')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('clear_queue')
      .setLabel('Clear')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('shuffle_queue')
      .setLabel('Shuffle')
      .setStyle(ButtonStyle.Secondary)
  ) as any;

  const payload = {
    content: '',
    embeds: [embed],
    components: [controlsRow, actionsRow],
  };

  const messages = await channel.messages.fetch();
  if (messages.size != 1 || messages.at(0).author.id != client.application.id) {
    messages.forEach(m => {
      m.delete();
    });

    channel.send(payload);
  } else {
    messages.at(0).edit(payload);
  }
};

export const getMusicQueue = (guildId: string): MusicQueue | undefined => {
  if (!queues[guildId]) {
    queues[guildId] = new MusicQueue(guildId);
  }

  return queues[guildId];
};
