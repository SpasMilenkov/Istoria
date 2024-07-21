import { REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Resolve __dirname and __filename for ES module compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Environment variables for authentication
const token = process.env.DISCORD_TOKEN
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID

if (!token || !clientId || !guildId) {
  throw new Error(
    'DISCORD_TOKEN, CLIENT_ID, and GUILD_ID must be defined in the environment variables'
  )
}

const commands: any[] = []
const foldersPath = join(__dirname, 'commands')
const commandFolders = readdirSync(foldersPath)

// Collect all command load promises
const loadCommandPromises = commandFolders.flatMap((folder) => {
  const commandsPath = join(foldersPath, folder)
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.js')
  )

  return commandFiles.map(async (file) => {
    const filePath = join(commandsPath, file)
    try {
      const commandModule = await import(filePath)
      const command = commandModule.default || commandModule

      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
      } else {
        console.warn(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        )
      }
    } catch (error) {
      console.error(`[ERROR] Failed to load command ${file}: ${error}`)
    }
  })
})

// Wait for all commands to load
Promise.all(loadCommandPromises).then(async () => {
  const rest = new REST({ version: '10' }).setToken(token)

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    const data = (await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    )) as any[]

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
})
