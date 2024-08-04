const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

import { REST, Routes } from 'discord.js';
import { commands } from './commands/';

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  const commandsData = Object.values(commands).map((command) => command.data);

  try {
    if (!token) {
      console.log('Token is undefined');
      return;
    }
    const rest = new REST({ version: '10' }).setToken(token);

    console.log('Started refreshing application (/) commands.');
    if (!clientId) {
      console.log('Client ID is undefined');
      return;
    }
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandsData,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
