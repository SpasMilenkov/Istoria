<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <header class="fixed w-full top-0 z-50 bg-secondary-dark bg-opacity-90 backdrop-blur">
            <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                <img src="/images/pots.png" alt="Istoria Logo" class="h-10">
                <nav class="hidden md:flex space-x-4">
                    <button v-for="(item, index) in navItems" :key="index"
                        class="group text-primary-50 transition-all duration-300 ease-in-out text"
                        @click="scrollTo(item.url)">
                        <span
                            class="bg-left-bottom bg-gradient-to-r from-primary-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            {{ item.name }}
                        </span>
                    </button>
                </nav>
                <button class="md:hidden text-primary" @click="toggleMobileMenu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </header>
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-secondary-dark bg-opacity-95">
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                <button v-for="(item, index) in navItems" :key="index"
                    class="group text-primary-50 transition-all duration-300 ease-in-out" @click="scrollTo(item.url)">
                    <span
                        class="bg-left-bottom bg-gradient-to-r from-primary-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        {{ item.name }}

                    </span>
                </button>
                <button class="mt-8 text-primary" @click="toggleMobileMenu">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Main content -->
        <main class="flex flex-grow">
            <slot></slot>
        </main>

        <!-- Footer -->
        <footer class="bg-secondary-dark py-8 px-4">
            <div class="container mx-auto text-center">
                <p class="text-secondary-light mb-4">© 2024 Istoria. Licensed under MIT.</p>
                <div class="flex justify-center space-x-4 mb-4">
                    <a href="#" class=" text-blue-100 hover:text-primary-light">
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

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const navItems = ref([
    { name: 'Home', url: '#' },
    { name: 'Features', url: 'features-section' },
    { name: 'Installation', url: 'installation-section' },
    { name: 'Tech Stack', url: 'tech-stack-section' },
    { name: 'Usage', url: 'usage-section' },
    { name: 'Contributing', url: 'contribution-section' }
])

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}


const scrollTo = (section: string, offset = 90) => {
    // Implement smooth scrolling to section
    const targetElement = document.getElementById(section);

    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    console.log(mobileMenuOpen.value)
    if (mobileMenuOpen.value) {
        console.log('toggling menu')
        toggleMobileMenu()

    }
}
</script>