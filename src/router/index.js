import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const PageConfig = () => import('../views/PageConfig');
const PageOverlay = () => import('../views/PageOverlay');

export default function createRouter() {
	const router = new Router({
		mode: 'hash',
		linkActiveClass: 'active',
		linkExactActiveClass: 'active-exact',
		scrollBehavior(to, from, savedPosition) {
			return {
				x: 0,
				y: savedPosition ? savedPosition.y : 0,
			};
		},
		routes: [{
			name: 'overlay',
			path: '/overlay',
			component: PageOverlay,
		}, {
			name: 'config',
			path: '/',
			component: PageConfig,
			meta: {
				background: 'gray',
			},
		}],
	});

	return router;
}
