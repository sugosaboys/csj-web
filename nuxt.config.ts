import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: true,

  nitro:{
    prerender:{
      routes: ['/']
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ["@nuxt/image", "nuxt-swiper"],
})