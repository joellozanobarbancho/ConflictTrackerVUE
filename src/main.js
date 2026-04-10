
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import messages from './locales'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
	legacy: false,
	locale: 'ca',
	fallbackLocale: 'en',
	messages,
})

createApp(App).use(router).use(pinia).use(i18n).mount('#app')
