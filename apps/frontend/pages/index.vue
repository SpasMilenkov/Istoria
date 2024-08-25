<template>
  <div class="flex-grow min-h-screen bg-gradient-to-b bg-secondary-dark text-secondary-100">
    <!-- Hero Section -->
    <section class="pt-24 pb-12 px-8 h-[100vh] bg-blend-darken hero-section flex items-center justify-center">
      <div class="container mx-auto text-center rounded-lg px-1 py-8 hero-title">
        <h1 class="text-5xl md:text-7xl text-secondary-100 mb-4">Istoria: Craft Your Own Story</h1>
        <p class="text-xl md:text-2xl accent-secondary-50 t mb-8">Go on an adventure, alone or with your friends in the
          world of Istoria.</p>
        <button
          class="bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Get Started
        </button>
      </div>
    </section>

    <!-- Sections -->
    <section v-for="(section, index) in sections" :key="index" class="py-8 px-4" :id="section.id">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-white mb-8">{{ section.title }}</h2>
        <div class="bg-secondary-100 dark:bg-secondary p-6 rounded-lg shadow-lg">
          <component :is="section.component" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FeaturesDropdown from '../components/FeaturesDropdown.vue'
import TechStackDropdown from '../components/TechStackDropdown.vue'
import InstallationDropdown from '../components/InstallationDropdown.vue'
import UsageDropdown from '../components/UsageDropdown.vue'
import ContributingDropdown from '../components/ContributingDropdown.vue'

const sections = [
  { title: '✨️ Features', component: FeaturesDropdown, id: 'features-section' },
  { title: '💡️ Tech Stack', component: TechStackDropdown, id: 'tech-stack-section' },
  { title: '⚙️ Installation', component: InstallationDropdown, id: 'installation-section' },
  { title: '🎊️ Usage', component: UsageDropdown, id: 'usage-section' },
  { title: '🆘️ Contributing', component: ContributingDropdown, id: 'contribution-section' },
]
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

code {
  font-family: 'Fira Code', monospace;
}

.hero-section {
  background: url('/images/istoria-background.jpeg') rgba(10, 10, 10, 0.2) no-repeat;
  background-size: cover;
}

.hero-title {
  background: rgba(10, 10, 10, 0.6);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: theme('colors.secondary.light');
}

::-webkit-scrollbar-thumb {
  background: theme('colors.primary.50');
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.primary.light');
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>