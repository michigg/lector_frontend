import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {faSpinner, faWheelchair, faMapPin, faDoorOpen, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueGeolocation from 'vue-browser-geolocation';


library.add(faHome);
library.add(faSpinner);
library.add(faWheelchair);
library.add(faMapPin);
library.add(faDoorOpen);
library.add(faTimes);

// fix icon for marker
import {Icon} from 'leaflet'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueGeolocation);
Vue.mixin({
    methods: {
        isBlocked: time => new Date() <= new Date(time)
    }
});

Vue.filter("do_room_number", (building_key, level, number) => {
    switch (number.toString().length) {
        case 1:
            number = '00' + number;
            break;
        case 2:
            number = '0' + number;
            break;
        default:
            break;
    }
    switch (level.toString().length) {
        case 1:
            level = '0' + level;
            break;
        default:
            break;
    }
    return building_key + "/" + level + "." + number;
},);
Vue.filter("format_time", value => {
    let time = value.toString().split('T')[1].split(':');
    return time[0] + ':' + time[1];
});

Vue.filter("format_file_name", value => {
    return value.toString().split('.')[0].toString().toLowerCase();
});

Vue.filter("reverse_arr", value => {
    return value.reverse();
});
window.axios = axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
