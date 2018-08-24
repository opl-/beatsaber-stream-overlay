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
		<label>
			Custom color theme (use <input type="checkbox" v-model="optColorEnabled" />)<br/>
			<input type="color" v-model="optColor" />
			<div class="color-example" title="Preview on game background">
				<div class="fill" :style="{backgroundColor: optColor}"></div>
			</div>
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
			optColor: null,
			optColorEnabled: false,
		};
	},
	computed: {
		urlQuery() {
			return {
				corner: this.optCorner || undefined,
				host: this.optHost || undefined,
				color: !this.optColorEnabled ? undefined : this.optColor,
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

		>.color-example {
			display: inline-block;
			width: 100px;
			height: 30px;
			margin-left: 16px;
			vertical-align: middle;
			background: linear-gradient(to right, #062f41 0, #062f41 50%, #3c0a08 50%, #3c0a08 100%);

			>.fill {
				width: 100%;
				height: 100%;
				opacity: 0.7;
			}
		}
	}
}
</style>
