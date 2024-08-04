<template>
  <div class="min-h-screen bg-gradient-to-b from-secondary-dark to-secondary text-secondary-100">
    <!-- Header -->
    <header class="fixed w-full top-0 z-50 bg-secondary-dark bg-opacity-90 backdrop-blur">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <img src="/images/pots.png" alt="Istoria Logo" class="h-10">
        <nav class="hidden md:flex space-x-4">
          <button v-for="item in navItems" :key="item"
            class="px-4 py-2 rounded-full hover:bg-primary transition duration-300" @click="scrollTo(item)">
            {{ item }}
          </button>
        </nav>
        <button class="md:hidden text-primary" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-secondary-dark bg-opacity-95">
      <div class="flex flex-col items-center justify-center h-full space-y-6">
        <button v-for="item in navItems" :key="item"
          class="text-2xl text-primary hover:text-primary-light transition duration-300" @click="scrollTo(item)">
          {{ item }}
        </button>
        <button class="mt-8 text-primary" @click="toggleMobileMenu">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="pt-24 pb-12 px-4 bg-cover bg-center" style="background-image: url('/images/dnd-background.jpg');">
      <div class="container mx-auto text-center">
        <h1 class="text-5xl md:text-7xl text-primary mb-4">Istoria: A D&D and Utility Discord Bot</h1>
        <p class="text-xl md:text-2xl text-secondary-light mb-8">Enhance your Discord D&D experience with party
          management, adventures, and utility features.</p>
        <button
          class="bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Get Started
        </button>
      </div>
    </section>

    <!-- Dropdown Sections -->
    <section v-for="(section, index) in sections" :key="index" class="py-12 px-4">
      <div class="container mx-auto">
        <button @click="toggleDropdown(index)"
          class="w-full text-left bg-secondary-light hover:bg-secondary p-4 rounded-lg flex justify-between items-center">
          <span class="text-2xl">{{ section.title }}</span>
          <svg class="w-6 h-6 transform transition-transform duration-300" :class="{ 'rotate-180': section.isOpen }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-show="section.isOpen" class="mt-4 bg-secondary-100 dark:bg-secondary  p-6 rounded-lg">
          <component :is="section.component" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-secondary-dark py-8 px-4">
      <div class="container mx-auto text-center">
        <p class="text-secondary-light mb-4">© 2024 Istoria. Licensed under MIT.</p>
        <div class="flex justify-center space-x-4 mb-4">
          <a href="#" class="text-primary hover:text-primary-light">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <!-- Add other social media icons as needed -->
        </div>
        <div class="flex justify-center space-x-4">
          <img src="https://img.shields.io/github/issues-pr/SpasMilenkov/Istoria" alt="Pull Requests">
          <img src="https://img.shields.io/github/issues/SpasMilenkov/Istoria" alt="Issues">
          <img src="https://img.shields.io/github/issues-closed/SpasMilenkov/Istoria" alt="Closed Issues">
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeaturesDropdown from '../components/FeaturesDropdown.vue'
import TechStackDropdown from '../components/TechStackDropdown.vue'
import InstallationDropdown from '../components/InstallationDropdown.vue'
import UsageDropdown from '../components/UsageDropdown.vue'
import ContributingDropdown from '../components/ContributingDropdown.vue'

const mobileMenuOpen = ref(false)
const navItems = ['Home', 'Features', 'Tech Stack', 'Installation', 'Usage', 'Contributing']

const sections = ref([
  { title: '✨️ Features', component: FeaturesDropdown, isOpen: true },
  { title: '💡️ Tech Stack', component: TechStackDropdown, isOpen: true },
  { title: '⚙️ Installation', component: InstallationDropdown, isOpen: true },
  { title: '🎊️ Usage', component: UsageDropdown, isOpen: true },
  { title: '🆘️ Contributing', component: ContributingDropdown, isOpen: true },
])

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleDropdown = (index) => {
  sections.value[index].isOpen = !sections.value[index].isOpen
}

const scrollTo = (section) => {
  // Implement smooth scrolling to section
  toggleMobileMenu()
}
</script>

<style>

body {
  font-family: 'Inter', sans-serif;
}

code {
  font-family: 'Fira Code', monospace;
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