<template>
    <div class="space-y-6">
        <div>
            <h3 class="text-xl font-bold mb-2 text-secondary-50">Prerequisites</h3>
            <ul class="list-none space-y-2">
                <li v-for="item in prerequisites" :key="item" class="flex items-center">
                    <svg class="w-5 h-5 mr-2 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {{ item }}
                </li>
            </ul>
        </div>
        <div>
            <h3 class="text-xl font-bold mb-2 text-secondary-50">Installation Steps</h3>
            <ol class="list-decimal list-inside space-y-4">
                <li v-for="(step, index) in installationSteps" :key="index">
                    <p class="mb-2">{{ step.instruction }}</p>
                    <div v-if="step.code" class="relative">
                        <pre class="bg-secondary-dark text-secondary-100 p-4 rounded-lg overflow-x-auto"><code>{{
                                step.code }}</code></pre>
                        <button @click="copyToClipboard(step.code)"
                            class="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm hover:bg-primary-light transition-colors duration-300">
                            Copy
                        </button>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const prerequisites = [
    'Node.js (v14 or higher)',
    'Docker (for containerization)',
    'A Discord bot token'
];

const installationSteps = [
    {
        instruction: 'Clone the Repository',
        code: 'git clone git@github.com:SpasMilenkov/Istoria.git\ncd istoria'
    },
    {
        instruction: 'Install Dependencies',
        code: 'npm install'
    },
    {
        instruction: 'Setup Environment Variables',
        code: '# Create a .env file in the root directory and add your environment variables.\n# You can use .env.template as a reference.'
    },
    {
        instruction: 'Run with Docker',
        code: 'docker-compose up --build'
    }
];

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // You can add a toast notification here
        console.log('Copied to clipboard');
    });
};
</script>