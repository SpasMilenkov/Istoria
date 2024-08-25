<template>
    <div class="flex flex-wrap justify-center items-center gap-8 ">
        <div v-for="tech in techStack" :key="tech.name" class="text-center group">
            <div
                class="w-20 h-20 mx-auto mb-2 flex items-center justify-center bg-secondary-100 dark:bg-secondary rounded-full ">
                <!-- <img :src="tech.logo" :alt="tech.name" class="w-12 h-12 object-contain"> -->
                <Icon :name="tech.logo" size="40"></Icon>
            </div>
            <span
                class="text-sm font-semibold text-secondary-50 group-hover:text-primary transition-colors duration-300">{{
                tech.name }}</span>
        </div>
    </div>
</template>

<script setup>
const techStack = [
    { name: 'Nuxt', logo: 'logos:nuxt-icon' },
    { name: 'DiscordJS', logo: 'devicon:discordjs' },
    { name: 'NestJS', logo: 'catppuccin:nest' },
    { name: 'Prisma', logo: 'simple-icons:prisma' },
    { name: 'Docker', logo: 'devicon:docker-wordmark' }
];
</script>