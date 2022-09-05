import { CacheType, ChatInputCommandInteraction, Collection } from 'discord.js';

export const noReply = (
  interaction: ChatInputCommandInteraction<CacheType>
) => {
  interaction.deferReply();
  interaction.deleteReply();
};

export const map = <K, V, X>(
  collection: Collection<K, V>,
  mapper: (inp: V) => X
): X[] => {
  const out: X[] = [];

  collection.forEach(c => {
    {
      out.push(mapper(c));
    }
  });

  return out;
};
