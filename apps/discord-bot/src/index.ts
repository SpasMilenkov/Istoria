import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { deployCommands } from './deploy-commands';
import { commands } from './commands';

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
if (!token) {
  throw new Error('Token is not defined in the environment variables');
}

const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

client.once('ready', async () => {
  if (!guildId) return;
  await deployCommands({ guildId: guildId });

  console.log('Discord bot is ready! 🤖');
});

client.once('guildCreate', async (guild) => {
  console.log('loading guild commands?');
});

client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(token);
