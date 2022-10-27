import {
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
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
export type Modal = {
  modal: string;
  executor: (interaction: ModalSubmitInteraction<CacheType>) => void;
};

export enum AdditionType {
  PLAYLIST,
  SINGLE_REQUEST,
}

export type MusicTitle = {
  name: string;
  url: string;
  thumbnail: string;
  duration: number;
  additionType: AdditionType;
};
