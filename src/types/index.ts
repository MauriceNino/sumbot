import {
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export type Command = {
  command: SlashCommandBuilder;
  executor: (interaction: ChatInputCommandInteraction<CacheType>) => void;
};
export type Button = {
  button: string;
  executor: (interaction: ButtonInteraction<CacheType>) => void;
};

export enum AdditionType {
  PLAYLIST,
  SINGLE_REQUEST,
}

export type MusicTitle = {
  requestingUser: string;
  name: string;
  artist: string;
  genre?: string;
  duration: number;
  additionType: AdditionType;
};
