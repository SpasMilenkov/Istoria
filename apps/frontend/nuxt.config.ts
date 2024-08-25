// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  icon: {
    size: '28px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    mode: 'css', // default <Icon> mode applied
    aliases: {
      nuxt: 'logos:nuxt-icon',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  compatibilityDate: '2024-08-25',
});