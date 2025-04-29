import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#3b82f6', // синій
                    400: '#60a5fa'  // світліший синій
                },
                // за бажанням — додай інші кольори
                danger: '#ef4444',
                success: '#22c55e',
            },
        }
    },
    plugins: []
}

export default config
