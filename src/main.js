import Vue from 'vue'
import router from './router'
import store from './store'
import config from './config.js'
import loadingService from './utils/loadingService'
import http from './utils/http'
import './extension'
import {
	Button,
	message,
	notification,
	Modal,
} from 'ant-design-vue'
import App from './App.vue'

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$config = config;
Vue.prototype.$loadingService = loadingService;
Vue.prototype.$http = http;

Vue.use(Button);
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
