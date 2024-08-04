import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';

/**
 * A module that provides a slash command to measure the user's ping.
 *
 * @module PingCommand
 */

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Measures your ping'),

  /**
   * Executes the ping command.
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction.
   */
  async execute(interaction: ChatInputCommandInteraction) {
    // Capture the timestamp right before replying
    const replyTimestamp = Date.now();
    // Send a reply and calculate the latency based on the interaction's created timestamp
    await interaction.reply(
      `🏓Latency is ${replyTimestamp - interaction.createdTimestamp}ms`
    );
  },
};
