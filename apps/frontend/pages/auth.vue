<template>
    <div class="relative h-screen w-full overflow-hidden">
        <!-- Background Image -->
        <img src="/images/snowy-mountain.jpeg" alt="Background" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Frosted Glass Form Container -->
        <div
            class="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 flex items-center justify-center backdrop-blur-md bg-secondary/30">
            <div class="w-full max-w-md bg-secondary/90 p-8 rounded-lg shadow-lg">
                <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-secondary-50">
                    {{ isLogin ? 'Login' : 'Register' }}
                </h2>

                <!-- Login Form -->
                <VeeForm v-if="isLogin" @submit="handleLogin" :validation-schema="loginSchema" v-slot="{ errors }">
                    <div class="space-y-4">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Email or
                                Username</label>
                            <VeeField name="email" type="text" v-model="loginForm.email"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="email" class="text-red-500 text-xs" />
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Password</label>
                            <VeeField name="password" type="password" v-model="loginForm.password"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="password" class="text-red-500 text-xs" />
                        </div>
                        <button type="submit"
                            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            Login
                        </button>
                    </div>
                </VeeForm>

                <!-- Register Form -->
                <VeeForm v-else @submit="handleRegister" :validation-schema="registerSchema" v-slot="{ errors }">
                    <div class="space-y-4">
                        <div>
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Username</label>
                            <VeeField name="username" type="text" v-model="registerForm.username"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="username" class="text-red-500 text-xs" />
                        </div>
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Email</label>
                            <VeeField name="email" type="email" v-model="registerForm.email"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="email" class="text-red-500 text-xs" />
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Password</label>
                            <VeeField name="password" type="password" v-model="registerForm.password"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="password" class="text-red-500 text-xs" />
                        </div>
                        <div>
                            <label for="confirmPassword"
                                class="block mb-2 text-sm font-medium text-gray-700 dark:text-secondary-50">Confirm
                                Password</label>
                            <VeeField name="confirmPassword" type="password" v-model="registerForm.confirmPassword"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80" />
                            <VeeErrorMessage name="confirmPassword" class="text-red-500 text-xs" />
                        </div>
                        <button type="submit"
                            class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
                            Register
                        </button>
                    </div>
                </VeeForm>

                <div class="mt-4 text-center">
                    <a href="#" @click.prevent="toggleForm"
                        class="group text-primary-50 transition-all duration-300 ease-in-out text">
                        <span
                            class="text-blue-100 bg-left-bottom bg-gradient-to-r from-primary-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            {{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import * as yup from 'yup'

const isLogin = ref(true)
const auth = useAuth()

const loginForm = reactive({
    email: '',
    password: '',
})

const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const loginSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(10, 'Password must be at least 10 characters'),
})

const registerSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(10, 'Password must be at least 10 characters'),
    confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords must match'),
})

const toggleForm = () => {
    isLogin.value = !isLogin.value
}

const handleLogin = async (values) => {
    try {
        const { data, error } = await auth.login(values.email, values.password)
        if (error.value) {
            console.error('Login error:', error.value)
            // Handle error (show error message to user)
        } else {
            console.log('Login successful:', data.value)
            // Handle successful login (store token, redirect)
        }
    } catch (e) {
        console.error('Login error:', e)
        // Handle unexpected errors
    }
}

const handleRegister = async (values) => {
    try {
        const { data, error } = await auth.register(values.username, values.email, values.password)
        if (error.value) {
            console.error('Registration error:', error.value)
            // Handle error (show error message to user)
        } else {
            console.log('Registration successful:', data.value)
            // Handle successful registration (show success message, redirect to login)
        }
    } catch (e) {
        console.error('Registration error:', e)
        // Handle unexpected errors
    }
}
</script>