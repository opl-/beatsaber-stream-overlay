import Vue from 'vue';
import App from './App';
import createRouter from './router';
import titleMixin from './util/title';
import * as filters from './util/filters';

// mixin for handling title
Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

// Expose a factory function that creates a fresh set of router, app instances
// on each call
export default function createApp() {
	// create router instance
	const router = createRouter();

	// create the app instance.
	// here we inject the router to all child components, making it available
	// everywhere as `this.$router`.
	const app = new Vue({
		router,
		render: h => h(App),
	});

	// expose the app, the router.
	return {app, router};
}
