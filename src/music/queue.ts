import { TextBasedChannel } from 'discord.js';
import { DEFAULT_MUSIC_CHANNEL } from '../settings';
import { client } from '../setup';
import { AdditionType, MusicTitle } from '../types';

export class MusicQueue {
  private queue: MusicTitle[] = [];
  private channel: TextBasedChannel;

  constructor(private guildId: string) {
    const guild = client.guilds.cache.find(g => g.id === guildId);
    const channel = guild.channels.cache.find(
      c => c.name === DEFAULT_MUSIC_CHANNEL
    ) as TextBasedChannel;

    this.channel = channel;
  }

  public getChannel(): TextBasedChannel {
    return this.channel;
  }

  public back(): void {}

  public pauseOrUnpause(): void {}

  public skip(): void {}

  public play(titles: MusicTitle[]): void {
    if (titles.length === 1) {
      const index =
        this.queue.findIndex(q => q.additionType === AdditionType.PLAYLIST) ||
        0;
      this.queue.splice(index, 0, ...titles);
    }
  }

  public stop(): void {
    this.queue = [];
  }

  public shuffle(): void {}
}
