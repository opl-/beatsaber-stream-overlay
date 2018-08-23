<template>
	<div id="app" :class="bgColor">
		<router-view :key="$route.path"></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	computed: {
		bgColor() {
			return `bg-${this.$route.meta.background || 'transparent'}`;
		},
	},
};
</script>

<style lang="stylus">
@import('./global.styl');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	list-style: none;
	border-spacing: 0;
}

html, body {
	background-color: transparent;
	font-family: Teko, sans-serif;
	font-size: 25px;
}

#app {
	min-width: 100vw;
	min-height: 100vh;
	overflow: hidden;
}

#app.bg-gray {
	background-color: #263238;
	color: rgba(255, 255, 255, 0.9);
}

a {
	color: #145dc1;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}

.flex-spacer {
	flex-grow: 1;
}

// debug
#webpack-hot-middleware-clientOverlay {
	z-index: 1000000 !important;
}
</style>
