// CURRENTLY DEPRECATED UNTIL I FIGURE OUT HOW TO BYPASS THE 403
// THIS IS JUST AN EXAMPLE PROBABLY WON'T EVEN MAKE IT TO THE FINAL BUILD

import {
  StreamType,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
  AudioPlayer,
  VoiceConnection,
} from '@discordjs/voice'
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
  EmbedBuilder,
  Channel,
} from 'discord.js'
import ytdl from 'ytdl-core'
import ytpl from 'ytpl'

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play audio in a voice channel')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the audio or playlist to play')
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const member: any = interaction.member
    const channel = member?.voice.channel
    if (!channel) {
      return interaction.reply({
        content: 'You need to be in a voice channel to use this command!',
        ephemeral: true,
      })
    }

    const connection: VoiceConnection =
      getVoiceConnection(channel.guild.id) ||
      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })

    const player: AudioPlayer = createAudioPlayer()

    // Audio player error handling
    player.on('error', (error) => {
      console.error('AudioPlayer error:', error)
      interaction.followUp({
        content: 'There was an error with the audio player.',
        ephemeral: true,
      })
      player.stop() // Stop the player on error
      // connection.destroy() // Optionally destroy the connection
    })

    connection.subscribe(player)

    const url = interaction.options.getString('url', true)
    if (!ytdl.validateURL(url) && !ytpl.validateID(url)) {
      return interaction.reply({
        content: 'The provided URL is not a valid YouTube URL.',
        ephemeral: true,
      })
    }

    let videoUrls: string[] = []
    let currentVideoIndex = 0

    try {
      if (ytpl.validateID(url)) {
        const playlist = await ytpl(url, { limit: 100 })
        videoUrls = playlist.items.map((item) => item.shortUrl)

        const embed = {
          color: 0x1db954, // Spotify green for a music vibe, adjust as needed
          title: `Now Playing Playlist: ${playlist.title}`,
          description:
            `**Total Videos:** ${playlist.items.length}\n` +
            `**Author:** [${playlist.author.name}](${playlist.author.url})`,
          thumbnail: {
            url: playlist.bestThumbnail.url || '',
          },
          url: playlist.url, // Link to the playlist
          fields: [
            {
              name: 'Playlist Description',
              value: playlist.description || 'No description available.',
            },
            {
              name: 'Duration',
              value: `Approx. ${Math.floor(playlist.estimatedItemCount / 10)} hours`, // Rough estimation
              inline: true,
            },
            {
              name: 'Views',
              value: playlist.views.toLocaleString(),
              inline: true,
            },
            {
              name: 'Updated',
              value: `<t:${Math.floor(new Date(playlist.lastUpdated).getTime() / 1000)}:R>`,
              inline: true,
            },
          ],
          image: {
            url: playlist.bestThumbnail.url || '', // Larger image if available
          },
          footer: {
            text: 'Requested by ' + interaction.user.username,
            iconURL:
              interaction.user.avatarURL() ??
              'https://usob.tu-sofia.bg/img/TUSlogosimple.png',
          },
          timestamp: new Date().toISOString(),
        }

        await interaction.reply({ embeds: [embed] })
      } else {
        videoUrls = [url]
        const video = await ytdl.getBasicInfo(url)
        const videoEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Now playing ' + video.videoDetails.title)
          .setURL(video.videoDetails.video_url)
          .setDescription(
            `**Author:** [${video.videoDetails.author.name}](${video.videoDetails.author.channel_url})`
          )
          .setAuthor({
            name: 'Екрана',
            iconURL: 'https://usob.tu-sofia.bg/img/TUSlogosimple.png',
            url: 'https://www.tu-sofia.bg/',
          })
          .setThumbnail(
            'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'
          )
          .setImage(
            video.videoDetails.thumbnails.reduce((prev, current) => {
              return (current.width ?? 0) * (current.height ?? 0) >
                (prev.width ?? 0) * (prev.height ?? 0)
                ? current
                : prev
            }).url
          )
          .setTimestamp()
          .setFooter({
            text: 'Requested by ' + interaction.user.username,
            iconURL:
              interaction.user.avatarURL() ??
              'https://usob.tu-sofia.bg/img/TUSlogosimple.png',
          })

        await interaction.reply({ embeds: [videoEmbed] })
      }

      await playFromList(
        player,
        videoUrls,
        interaction,
        currentVideoIndex,
        connection
      )
    } catch (error) {
      console.error('Error playing audio:', error)
      return interaction.reply({
        content:
          'There was an error playing the audio. Please check the URL and try again.',
        ephemeral: true,
      })
    }
  },
}

// Helper function to play audio from a list
async function playFromList(
  player: AudioPlayer,
  videoUrls: string[],
  interaction: ChatInputCommandInteraction<CacheType>,
  startIndex: number,
  connection: VoiceConnection
): Promise<void> {
  console.log(videoUrls)
  for (let i = startIndex; i < videoUrls.length; i++) {
    try {
      await playAudio(player, videoUrls[i], interaction)
    } catch (error) {
      console.error('Error playing video:', error)
      // Attempt reconnection and resume playback
      console.log('Attempting to reconnect and resume playback...')
      await reconnectAndResume(player, videoUrls, i, interaction, connection)
    }
  }
}

// Helper function to play a single audio track
async function playAudio(
  player: any, //Mismatch in the type when set to AudioPlayer, complains about the .once() call although it works?
  url: string,
  interaction: ChatInputCommandInteraction<CacheType>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const video = await ytdl.getBasicInfo(url)
      const stream = ytdl(url, {
        filter: 'audioonly',
        highWaterMark: 1 << 62, // Adjust if needed
        liveBuffer: 1 << 62,
        dlChunkSize: 0,
      })
      const resource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
      })
      const videoEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Now playing ' + video.videoDetails.title)
        .setURL(video.videoDetails.video_url)
        .setDescription(
          `**Author:** [${video.videoDetails.author.name}](${video.videoDetails.author.channel_url})`
        )
        .setAuthor({
          name: 'Екрана',
          iconURL: 'https://usob.tu-sofia.bg/img/TUSlogosimple.png',
          url: 'https://www.tu-sofia.bg/',
        })
        .setThumbnail(
          'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'
        )
        .setImage(
          video.videoDetails.thumbnails.reduce((prev, current) => {
            return (current.width ?? 0) * (current.height ?? 0) >
              (prev.width ?? 0) * (prev.height ?? 0)
              ? current
              : prev
          }).url
        )
        .setTimestamp()
        .setFooter({
          text: 'Requested by ' + interaction.user.username,
          iconURL:
            interaction.user.avatarURL() ??
            'https://usob.tu-sofia.bg/img/TUSlogosimple.png',
        })
      const member: any = interaction.member
      const channel = member?.voice.channel
      channel.send({ embeds: [videoEmbed] })
      player.play(resource)

      player.once('idle', () => {
        resolve()
      })

      stream.once('error', (error) => {
        console.error('Stream error:', error)
        reject(error)
      })
    } catch (error) {
      console.error('Error creating audio resource:', error)
      reject(error)
    }
  })
}

// Helper function to handle reconnection and resume playback
async function reconnectAndResume(
  player: AudioPlayer,
  videoUrls: string[],
  index: number,
  interaction: ChatInputCommandInteraction<CacheType>,
  connection: VoiceConnection
) {
  // Reconnect to the voice channel if necessary
  if (!connection || connection.state.status !== 'ready') {
    const member: any = interaction.member
    const channel = member?.voice.channel
    if (!channel) {
      return interaction.followUp({
        content: 'You need to be in a voice channel to resume playback!',
        ephemeral: true,
      })
    }

    connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })
    connection.subscribe(player)
  }

  console.log(
    'attempting to continue with the playlist, died at Index: ' + index
  )

  await playFromList(player, videoUrls, interaction, index, connection)
}
