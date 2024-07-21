# ![Istoria](./apps/frontend/public/images/pots.png)

## Istoria: A D&D and Utility Discord Bot

Welcome to Istoria! Istoria is a versatile Discord bot designed for Dungeons & Dragons (D&D) enthusiasts. It allows players to form parties, embark on adventures, and enjoy a range of utility features to enhance their gaming experience.

## 📑️ Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨️ Features

- **Party Management**: Create and manage D&D parties.
- **Adventure System**: Embark on adventures with your party.
- **Utility Commands**: Various utility commands to enhance your Discord experience.
- **Customizable**: Configure the bot to fit your server's needs.

## 💡️ Tech Stack

Istoria is built using the following technologies:

- [Nuxt](https://nuxtjs.org/) - Frontend Framework
- [DiscordJS](https://discord.js.org/) - Discord Bot Framework
- [NestJS](https://nestjs.com/) - Backend Framework
- [Prisma](https://www.prisma.io/) - ORM for Database Management
- [Docker](https://www.docker.com/) - Containerization Platform

## ⚙️ Installation

### Prerequisites

- Node.js (v14 or higher)
- Docker (for containerization)
- A Discord bot token

### Steps

1. **Clone the Repository**

   ```sh
   git clone git@github.com:SpasMilenkov/Istoria.git
   cd istoria
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add your environment variables. You can use `.env.template` as a template.

4. **Run with Docker**
   ```sh
   docker-compose up --build
   ```

## 🎊️ Usage

1. **Invite the Bot to Your Server**
   Generate an invite link using the Discord Developer Portal and invite the bot to your server.

2. **Interact with Istoria**
   Use the various commands to create parties, start adventures, and more. You can find a list of commands by typing `!help` in your Discord server.

## 🆘️ Contributing

We welcome contributions from the community! Here’s how you can get involved:

1. **Fork the Repository**

2. **Create a Branch**

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```sh
   git commit -m 'Add some feature'
   ```

5. **Push to the Branch**

   ```sh
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   Make sure your pull request is targeted at the `dev` branch.

### 📃️ Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) when contributing to this project.

## 📄️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## 📊️ Project Status

![GitHub pull requests](https://img.shields.io/github/issues-pr/SpasMilenkov/Istoria)
![GitHub issues](https://img.shields.io/github/issues/SpasMilenkov/Istoria)
![GitHub closed issues](https://img.shields.io/github/issues-closed/SpasMilenkov/Istoria)

---

Happy adventuring with Istoria!
