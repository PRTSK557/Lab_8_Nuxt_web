// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxthq/ui'],

  ui: {
    icons: 'heroicons'
  },

  app: {
    head: {
      titleTemplate: '%s - Продуктовий застосунок',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Сторінка зі списком продуктів з пошуком, сортуванням і пагінацією.' }
      ]
    }
  }
})
