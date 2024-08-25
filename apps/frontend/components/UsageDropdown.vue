<template>
    <div class="space-y-6">
        <ol class="list-decimal list-inside space-y-4">
            <li v-for="(step, index) in usageSteps" :key="index">
                <p>{{ step.instruction }}</p>
                <div v-if="step.action" class="mt-2">
                    <button :class="step.action.class" @click="step.action.handler">
                        {{ step.action.text }}
                    </button>
                </div>
            </li>
        </ol>
        <div class="mt-8">
            <h3 class="text-xl font-bold mb-2 text-secondary-50">Basic Bot Commands</h3>
            <div class="bg-secondary-dark text-secondary-100 p-4 rounded-lg overflow-hidden">
                <!-- Replace this with an actual GIF or video demonstrating bot commands -->
                <div class="w-full h-40 bg-secondary flex items-center justify-center">
                    [Animated GIF demonstrating bot commands]
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const usageSteps = [
    {
        instruction: 'Invite the Bot to Your Server',
        action: {
            text: 'Invite Bot',
            class: 'bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded',
            handler: () => window.open('https://discord.com/developers/applications', '_blank')
        }
    },
    {
        instruction: 'Set up the bot\'s permissions and roles in your server settings.'
    },
    {
        instruction: 'Start interacting with Istoria using commands. Type !help to see available commands.'
    }
];
</script>