<template>
    <div class="space-y-6">
        <ol class="list-decimal list-inside space-y-4">
            <li v-for="(step, index) in contributingSteps" :key="index" class="flex items-start">
                <span class="mr-2">{{ index + 1 }}.</span>
                <div>
                    <p class="font-semibold text-secondary-600">{{ step.title }}</p>
                    <p class="text-secondary dark:text-secondary-50 mt-1">{{ step.description }}</p>
                    <div v-if="step.code" class="mt-2 relative">
                        <pre class="bg-secondary-dark text-secondary-100 p-4 rounded-lg overflow-x-auto"><code>{{
                            step.code }}</code></pre>
                        <button @click="copyToClipboard(step.code)"
                            class="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm hover:bg-primary-light transition-colors duration-300">
                            Copy
                        </button>
                    </div>
                </div>
            </li>
        </ol>
        <div class="mt-6">
            <a href="CODE_OF_CONDUCT.md" class="text-accent-blue hover:underline">Read our Code of Conduct</a>
        </div>
        <div class="mt-6">
            <button @click="openPullRequest"
                class="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Open a Pull Request
            </button>
        </div>
    </div>
</template>

<script setup>
const contributingSteps = [
    {
        title: 'Fork the Repository',
        description: 'Create your own copy of the project on GitHub.'
    },
    {
        title: 'Create a Branch',
        description: 'Make a new branch for your feature or bug fix.',
        code: 'git checkout -b feature/your-feature-name'
    },
    {
        title: 'Make Your Changes',
        description: 'Implement your feature or fix the bug.'
    },
    {
        title: 'Commit Your Changes',
        description: 'Save your changes with a descriptive commit message.',
        code: 'git commit -m "Add some feature"'
    },
    {
        title: 'Push to the Branch',
        description: 'Upload your changes to your forked repository.',
        code: 'git push origin feature/your-feature-name'
    },
    {
        title: 'Open a Pull Request',
        description: 'Create a pull request to propose your changes to the main project. Make sure it\'s targeted at the `dev` branch.'
    }
];

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // You can add a toast notification here
        console.log('Copied to clipboard');
    });
};

const openPullRequest = () => {
    window.open('https://github.com/SpasMilenkov/Istoria/compare', '_blank');
};
</script>