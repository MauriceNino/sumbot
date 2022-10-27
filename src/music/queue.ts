import { Player, Track } from 'discord-player';
import { TextBasedChannel, User } from 'discord.js';
import { DEFAULT_MUSIC_CHANNEL } from '../settings';
import { client } from '../setup';

export class MusicQueue {
  private channel;
  private player;
  private playerQueue;

  constructor(private guildId: string) {
    const guild = client.guilds.cache.find(g => g.id === guildId);

    this.channel = guild.channels.cache.find(
      c => c.name === DEFAULT_MUSIC_CHANNEL
    ) as TextBasedChannel;

    this.player = new Player(client);
    this.playerQueue = this.player.createQueue(guild, {
      metadata: {
        channel: this.channel,
      },
    });
  }

  public async play(user: User) {
    if (!this.playerQueue.connection) {
      const guild = client.guilds.cache.find(g => g.id === this.guildId);
      const member = guild.members.cache.find(m => m.user.id === user.id);
      const userVoiceChannel = member.voice.channel;

      if (userVoiceChannel) {
        await this.playerQueue.connect(userVoiceChannel);
        await this.playerQueue.play();
      }
    }
  }

  public async addSong(
    user: User,
    urlOrName: string,
    autoJoin = true
  ): Promise<void> {
    const tracks = await this.player.search(urlOrName, {
      requestedBy: user,
    });

    // console.log(tracks);

    if (/^(www.|https?:\/\/)/.test(urlOrName)) {
      this.playerQueue.addTracks(tracks.tracks);
    } else {
      this.playerQueue.addTrack(tracks.tracks[0]);
    }

    if (autoJoin) await this.play(user);
  }

  public back(): void {
    this.playerQueue.back();
  }

  public async pauseOrUnpause(user: User): Promise<void> {
    if (!this.playerQueue.connection) {
      await this.play(user);
    }

    if (this.playerQueue.connection.paused) {
      this.playerQueue.setPaused(false);
    } else {
      this.playerQueue.setPaused(true);
    }
  }

  public skip(): void {
    this.playerQueue.skip();
  }

  public stop(): void {
    this.playerQueue.stop();
  }

  public shuffle(): void {
    this.playerQueue.shuffle();
  }

  public getChannel(): TextBasedChannel {
    return this.channel;
  }

  public list(): Track[] {
    if (this.playerQueue.connection) {
      return [this.playerQueue.current, ...this.playerQueue.tracks];
    }
    return this.playerQueue.tracks;
  }
}
