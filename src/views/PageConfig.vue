<template>
	<div class="page-config">
		<h1 class="title">Beat Saber stream overlay</h1>
		<h3 class="section">Configure</h3>
		<label>
			Corner<br/>
			<select v-model="optCorner">
				<option value="topleft" selected>Top left</option>
				<option value="topright">Top right</option>
				<option value="bottomright">Bottom right</option>
				<option value="bottomleft">Bottom left</option>
			</select>
		</label>
		<label>
			Game host address<br/>
			<input type="text" v-model="optHost" placeholder="localhost:6557" />
		</label>
		<router-link :to="{name: 'overlay', query: urlQuery}">[Open overlay]</router-link>
	</div>
</template>

<script>
export default {
	name: 'page-config',
	title: 'Beat Saber Overlay',
	data() {
		return {
			optCorner: 'topleft',
			optHost: null,
		};
	},
	computed: {
		urlQuery() {
			return {
				corner: this.optCorner || undefined,
				host: this.optHost || undefined,
			};
		},
	},
};
</script>

<style lang="stylus" scoped>
@import('../global.styl');

.page-config {
	width: 500px;
	margin: 30px auto;

	h1 {
		color: rgba(255, 255, 255, 0.87);
	}

	h3 {
		color: rgba(255, 255, 255, 0.89);
	}

	>.title {
		text-align: center;
	}

	>.section {
		text-align: center;
	}

	>label {
		display: block;
		margin: 16px 0;
	}
}
</style>
