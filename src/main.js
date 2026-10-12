import { createApp, watch } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css';

import App from './App.vue';
import pinia from './pinia.js';
import i18n from './i18n.js';
import router from './router.js';

watch(i18n.global.locale, locale => {
    document.documentElement.lang = locale;
}, { immediate: true });

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Material,
            options: {
                darkModeSelector: false
            }
        }
    })
    .use(pinia)
    .use(i18n)
    .use(router)
    .mount('#app');