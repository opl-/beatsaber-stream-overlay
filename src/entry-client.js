import createApp from './app';

const {app, router} = createApp();

router.onReady(() => {
	// actually mount to DOM
	app.$mount('#app');
});
