// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/eslint', 'nuxt-icon'],
  imports: {
    dirs: ['components/**', 'composables/**', 'utils/**'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['@/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/abstracts/_variables.scss";`,
        },
      },
    },
  },
})
