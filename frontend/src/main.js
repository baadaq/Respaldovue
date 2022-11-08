import { createApp } from 'vue';
import App from './App.vue';
import VueSignaturePad from 'vue-signature-pad';
import useVuelidate from '@vuelidate/core';
import Vuex from 'vuex';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimeVue from 'primevue/config';
import Divider from 'primevue/divider';

//Componentes
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Menubar from 'primevue/menubar';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';

//CSS

import "primevue/resources/themes/rhea/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//Rutas
import router from './router.js';
import store from './store/store.js';


//Carga
const app = createApp(App);
app.config.globalProperties.$user="";
//
app.use(Vuex);
app.use(store);
app.use(router);
app.use(PrimeVue, {ripple:true});
app.use(VueSignaturePad);
app.use(useVuelidate);
///Componentes
app.component('Calendar',Calendar);
app.component('Card',Card);
app.component('Dialog',Dialog);
app.component('Sidebar',Sidebar);
app.component('Menubar',Menubar);
app.component('Menu',Menu);
app.component('Textarea',Textarea);
app.component('Column',Column);
app.component('DataTable',DataTable);
app.component('InputText',InputText);
app.component('Button',Button);
app.component('Toolbar',Toolbar);
app.component('InputNumber',InputNumber);
app.component('Dropdown',Dropdown);
app.component('Divider',Divider);

app.mount('#app')




