import { SlashCommandBuilder } from 'discord.js'
import { ChatInputCommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Measures your ping'),
  async execute(interaction: ChatInputCommandInteraction) {
    // Capture the timestamp right before replying
    const replyTimestamp = Date.now()
    console.log(interaction)
    // Send a reply and calculate the latency based on the interaction's created timestamp
    await interaction.reply(
      `🏓Latency is ${replyTimestamp - interaction.createdTimestamp}ms`
    )
  },
}
