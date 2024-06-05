import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseLoader from '@/components/UI/BaseLoader.vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { VApp, VAppBar, VMain, VContainer, VProgressCircular } from 'vuetify/components'
import { VBtn } from 'vuetify/components'

const vuetify = createVuetify({
    components: {
        VApp,
        VAppBar,
        VMain,
        VContainer,
        VProgressCircular,
        VBtn
    }
})

const app = createApp(App)


app.use(router)
app.use(vuetify)
app.component('base-loader', BaseLoader)
app.mount('#app')
