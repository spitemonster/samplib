import '../scss/global.scss'

import { createApp } from 'vue'
import * as Tone from 'tone'
import App from './vue/App.vue'
import SampleCard from './vue/components/SampleCard.vue'
import UploadForm from './vue/components/UploadForm.vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $tone: typeof Tone
    }
}

export const app = createApp(App)

app.component("SampleCard", SampleCard)
app.component("UploadForm", UploadForm);

app.provide('$tone', Tone)

app.config.errorHandler = (err) => {
    console.log('THERE HAS BEEN AN ERROR')
    console.log(err)
}

app.mount('#app')
