import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import copyText from '@meforma/vue-copy-to-clipboard';


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(copyText);

app.mount('#app');

