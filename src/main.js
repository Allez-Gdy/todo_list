import { createSSRApp } from "vue";
import App from "./App.vue";
import './assets/iconfont/iconfont.css'

export function createApp() {
	const app = createSSRApp(App);

	return {
		app,
	};
}
