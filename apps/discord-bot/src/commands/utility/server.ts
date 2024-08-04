import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';

/**
 * A module that provides a slash command to display information about the server.
 *
 * @module ServerInfoCommand
 */

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),

  /**
   * Executes the server info command.
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction.
   */
  async execute(interaction: ChatInputCommandInteraction) {
    const { guild } = interaction;
    if (!guild) {
      await interaction.reply('This command can only be used in a server.');
      return;
    }

    const owner = await guild.fetchOwner();

    const embed = {
      color: 0x0099ff,
      title: `${guild.name} Server Information`,
      thumbnail: {
        url: guild.iconURL() || '',
      },
      fields: [
        {
          name: 'Server Name',
          value: guild.name,
          inline: true,
        },
        {
          name: 'Server ID',
          value: guild.id,
          inline: true,
        },
        {
          name: 'Owner',
          value: `${owner.user.tag} (${owner.id})`,
          inline: true,
        },
        {
          name: 'Member Count',
          value: `${guild.memberCount}`,
          inline: true,
        },
        {
          name: 'Creation Date',
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: true,
        },
        {
          name: 'Region',
          value: guild.preferredLocale,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `Requested by ${interaction.user.tag}`,
        icon_url: interaction.user.avatarURL() || '',
      },
    };

    await interaction.reply({ embeds: [embed] });
  },
};
