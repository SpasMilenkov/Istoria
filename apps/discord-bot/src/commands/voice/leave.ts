import { getVoiceConnection } from '@discordjs/voice';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

/**
 * A module that provides a slash command to leave a voice channel.
 *
 * @module LeaveCommand
 */

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the voice channel'),

  /**
   * Executes the leave command.
   *
   * @param {ChatInputCommandInteraction<CacheType>} interaction - The command interaction.
   */
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    if (interaction.guild?.id === undefined) return;

    const connection = getVoiceConnection(interaction.guild?.id);

    if (!connection) {
      return interaction.reply({
        content: 'I am not in a voice channel!',
        ephemeral: true,
      });
    }

    connection.destroy();
    await interaction.reply('Left the voice channel! 👋');
  },
};
