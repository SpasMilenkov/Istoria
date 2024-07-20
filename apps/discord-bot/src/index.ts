import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Resolve __dirname and __filename for ES module compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const token = process.env.DISCORD_TOKEN

if (!token) {
  throw new Error('Token is not defined in the environment variables')
}

// Create the client and attach the commands collection
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
}) as Client & { commands: Collection<string, any> }

client.commands = new Collection()

// Load Commands
const foldersPath = join(__dirname, 'commands')
const commandFolders = readdirSync(foldersPath)

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
        client.commands.set(command.data.name, command)
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

// Load Events
const eventsPath = join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath).filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
)

const loadEventPromises = eventFiles.map(async (file) => {
  const filePath = join(eventsPath, file)
  try {
    const eventModule = await import(filePath)
    const event = eventModule.default || eventModule.event || eventModule

    if (event && 'name' in event && 'execute' in event) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
      } else {
        client.on(event.name, (...args) => event.execute(...args))
      }
    } else {
      console.warn(
        `[WARNING] The event at ${filePath} is missing a required "name" or "execute" property.`
      )
    }
  } catch (error) {
    console.error(`[ERROR] Failed to load event ${file}: ${error}`)
  }
})

// Wait for all commands and events to load, then login the client
Promise.all([...loadCommandPromises, ...loadEventPromises]).then(() => {
  console.log('All commands and events have been successfully loaded.')

  client
    .login(token)
    .catch((error) => console.error(`[ERROR] Failed to login: ${error}`))
})
