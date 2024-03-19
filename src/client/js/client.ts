import '../scss/global.scss'

import { createApp } from 'vue'
import * as Tone from 'tone'
import App from './vue/App.vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $tone: typeof Tone
    }
}

export const app = createApp(App)

app.provide('$tone', Tone)

app.config.errorHandler = (err) => {
    console.log('THERE HAS BEEN AN ERROR')
    console.log(err)
}

app.mount('#app')
