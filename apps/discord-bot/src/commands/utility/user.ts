import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  GuildMember,
} from 'discord.js';

/**
 * A module that provides a slash command to display information about a user in a Discord guild.
 *
 * @module UserInfoCommand
 */

export default {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The user to get information about')
        .setRequired(false)
    ),

  /**
   * Executes the user info command.
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction.
   */
  async execute(interaction: ChatInputCommandInteraction) {
    const targetUser =
      interaction.options.getUser('target') || interaction.user;
    const targetMember = interaction.guild?.members.cache.get(
      targetUser.id
    ) as GuildMember;

    if (!targetMember) {
      await interaction.reply(
        'Unable to retrieve membership information for the specified user.'
      );
      return;
    }

    const memberColor =
      targetMember.displayHexColor === '#000000'
        ? '#0099ff'
        : targetMember.displayHexColor;
    const highestRole = targetMember.roles.highest;
    const embed = {
      color: parseInt(memberColor.replace('#', ''), 16),
      title: `${targetUser.tag} Information`,
      thumbnail: {
        url: targetUser.avatarURL() || '',
      },
      fields: [
        {
          name: 'Username',
          value: targetUser.username,
          inline: true,
        },
        {
          name: 'Nickname',
          value: targetMember.nickname || 'None',
          inline: true,
        },
        {
          name: 'Discriminator',
          value: `#${targetUser.discriminator}`,
          inline: true,
        },
        {
          name: 'User ID',
          value: targetUser.id,
          inline: true,
        },
        {
          name: 'Account Creation Date',
          value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`,
          inline: true,
        },
        {
          name: 'Join Date',
          value: targetMember.joinedAt
            ? `<t:${Math.floor(targetMember.joinedTimestamp! / 1000)}:F>`
            : 'Unknown',
          inline: true,
        },
        {
          name: 'Highest Role',
          value: highestRole.name,
          inline: true,
        },
        {
          name: 'Roles',
          value:
            targetMember.roles.cache
              .filter((role) => role.id !== interaction.guildId) // Exclude @everyone role
              .map((role) => role.name)
              .join(', ') || 'None',
        },
        {
          name: 'Server Boosting',
          value: targetMember.premiumSince
            ? `Boosting since <t:${Math.floor(targetMember.premiumSinceTimestamp! / 1000)}:F>`
            : 'Not Boosting',
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
