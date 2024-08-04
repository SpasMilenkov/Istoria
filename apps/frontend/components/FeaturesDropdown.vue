<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="feature in features" :key="feature.title"
            class="bg-secondary-100 dark:bg-neutral-900  p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-primary">
            <div class="text-4xl mb-4 text-primary">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-2 text-secondary-600 " >{{ feature.title }}</h3>
            <p class="text-secondary dark:text-secondary-50">{{ feature.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const features = [
    {
        icon: '👥',
        title: 'Party Management',
        description: 'Create and manage D&D parties with ease.'
    },
    {
        icon: '🗺️',
        title: 'Adventure System',
        description: 'Embark on exciting adventures with your party.'
    },
    {
        icon: '🛠️',
        title: 'Utility Commands',
        description: 'Access various utility commands to enhance your Discord experience.'
    },
    {
        icon: '⚙️',
        title: 'Customizable',
        description: 'Configure the bot to fit your server\'s unique needs.'
    }
];
</script>