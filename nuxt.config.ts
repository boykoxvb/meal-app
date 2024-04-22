// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/eslint', 'nuxt-icon', 'nuxt-primevue'],
  imports: {
    dirs: ['components/**/**/**', 'composables/**', 'utils/**'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['@/assets/scss/global.scss', 'primevue/resources/themes/aura-light-green/theme.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/abstracts/_variables.scss"; 
          @import "@/assets/scss/abstracts/_mixins.scss";
          `,
        },
      },
    },
  },

  // Modules
  primevue: {
    components: {
      prefix: 'Base',
      include: ['InputNumber', 'InputText', 'Button', 'Dropdown', 'FloatLabel', 'Image'],
    },
  },
})
