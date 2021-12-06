import { createApp } from 'vue'
import App from './App.vue'
import Vuex from './store/index'
import './scss/styles.scss'

createApp(App)
    .use(Vuex)
    .mount('#app')
