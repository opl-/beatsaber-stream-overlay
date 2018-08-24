<template>
	<div class="page-overlay" :class="[`side-${cornerSideX}`, `side-${cornerSideY}`]">
		<template v-if="data">
			<div class="map-info" :style="{background: progressGradient, boxShadow: themeBoxShadow}">
				<template v-if="data.beatmap">
					<span class="name">{{ data.beatmap.songName }}</span>
					<span class="subname" v-if="data.beatmap.songSubName">&nbsp;{{ data.beatmap.songSubName }}</span>
					<span class="author" v-if="data.beatmap.songAuthorName">&nbsp;-&nbsp;{{ data.beatmap.songAuthorName }}</span>
				</template>
				<span v-else>In menu</span>
			</div>
			<div class="performance-info" v-if="data.performance" :style="{textShadow: themeTextShadow}">
				<span class="hittage">HIT {{ hittage }}%</span>
				<span class="score">SCORE {{ data.performance.score }} ({{ scorePercentage }}% - {{ data.performance.rank }})</span>
			</div>
		</template>
		<div class="map-info" v-else>
			Connecting...
		</div>
	</div>
</template>

<script>
export default {
	name: 'page-overlay',
	title: 'Beat Saber Overlay',
	data() {
		return {
			ws: null,
			intervalID: null,
			progressGradient: '',
			serverTimeOffset: 0,
			data: null,
		};
	},
	computed: {
		corner() {
			return this.$route.query.corner || 'top-left';
		},
		cornerSideX() {
			return this.corner.includes('left') ? 'left' : 'right';
		},
		cornerSideY() {
			return this.corner.includes('top') ? 'top' : 'bottom';
		},
		host() {
			let host = this.$route.query.host || 'localhost:6557';

			if (!host.includes(':')) host += ':6557';

			return host;
		},
		themeColor() {
			let param = this.$route.query.color;

			if (!param) return '183, 5, 18';

			/* eslint-disable no-cond-assign */
			let r = null;
			if (r = /#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(param)) {
				param = `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}`;
			} else if (r = /#?([0-9a-f])([0-9a-f])([0-9a-f])/i.exec(param)) {
				param = `${parseInt(r[1] + r[1], 16)}, ${parseInt(r[2] + r[2], 16)}, ${parseInt(r[3] + r[3], 16)}`;
			} else if (r = /(\d{1,3}), *?(\d{1,3}), *?(\d{1,3})/i.exec(param)) {
				param = `${r[1]}, ${r[2]}, ${r[3]}`;
			} else {
				console.warn(`Unknown color format: ${JSON.stringify(param)}`);
				param = '255, 0, 255';
			}
			/* eslint-enable */

			return param;
		},
		themeTextShadow() {
			return `0 0 2px #fff, 0 0 6px rgb(${this.themeColor}), 0 0 14px rgb(${this.themeColor})`;
		},
		themeBoxShadow() {
			return `0 0 10px rgb(${this.themeColor})`;
		},
		hittage() {
			return this.data.performance.passedNotes === 0 ? 0 : Math.floor((this.data.performance.hitNotes / this.data.performance.passedNotes) * 1000) / 10;
		},
		scorePercentage() {
			return this.data.performance.currentMaxScore === 0 ? 0 : Math.floor((this.data.performance.score / this.data.performance.currentMaxScore) * 1000) / 10;
		},
	},
	mounted() {
		this.updateGradient();
		this.connect();

		this.intervalID = setInterval(() => this.updateGradient(), 200);
	},
	destroyed() {
		this.disconnect();

		clearInterval(this.intervalID);
		this.intervalID = null;
	},
	methods: {
		now() {
			return Date.now() + this.serverTimeOffset;
		},
		connect() {
			this.ws = new WebSocket(`ws://${this.host}/socket`);

			this.ws.onclose = this.onClose.bind(this);
			this.ws.onmessage = this.onMessage.bind(this);
		},
		disconnect() {
			if (!this.ws) return;

			this.ws.close();
			this.ws = null;
		},
		onClose() {
			setTimeout(() => this.connect(), 2000);
		},
		onMessage(data) {
			const msg = JSON.parse(data.data);

			if (msg.time) {
				this.serverTimeOffset = msg.time - Date.now();
			}

			if (msg.status) {
				this.data = {
					...(this.data || {}),
					...msg.status,
				};
			}
		},
		updateGradient() {
			if (!this.data || !this.data.beatmap || !this.data.beatmap.start) {
				this.progressGradient = 'rgba(30, 24, 24, 0.7)';
				return;
			}

			const progressMS = this.data.beatmap.paused ? this.data.beatmap.paused - this.data.beatmap.start : this.now() - this.data.beatmap.start;
			const progress = Math.round((progressMS / this.data.beatmap.length) * 1000) / 10;

			this.progressGradient = `linear-gradient(to right, rgba(${this.themeColor}, 0.7) 0, rgba(${this.themeColor}, 0.7) ${progress}%, rgba(30, 24, 24, 0.7) ${progress}%, rgba(30, 24, 24, 0.7) 100%)`;
		},
	},
};
</script>

<style lang="stylus" scoped>
@import('../global.styl');

.page-overlay {
	display: flex;
	width: 100vw;
	height: 100vh;
	flex-direction: column;
	align-items: start;

	&.side-bottom {
		align-content: flex-end;
		flex-direction: column-reverse;
	}

	&.side-right {
		align-items: end;
	}

	>.map-info {
		height: 40px;
		min-width: 300px;
		padding: 0 16px;
		background-color: rgba(30, 24, 24, 0.7);
		box-shadow: 0 0 10px $c-theme;
		line-height: @height;
		color: rgba(255, 255, 255, 0.97);
		text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
		text-align: center;
		text-transform: uppercase;
		text-overflow: ellipsis;
		overflow: hidden;

		^[-1].side-top.side-left ^[-1..-1] {
			border-bottom-right-radius: 12px;
		}

		^[-1].side-top.side-right ^[-1..-1] {
			border-bottom-left-radius: 12px;
		}

		^[-1].side-bottom.side-right ^[-1..-1] {
			border-top-left-radius: 12px;
		}

		^[-1].side-bottom.side-left ^[-1..-1] {
			border-top-right-radius: 12px;
		}

		>.subname {
			color: rgba(255, 255, 255, 0.83);
		}
	}

	>.performance-info {
		padding: 6px 16px;
		color: #fff;
		text-shadow: 0 0 2px #fff, 0 0 6px $c-theme, 0 0 14px $c-theme;

		>span {
			^[-2].side-left ^[-2..-1] {
				padding-right: 24px;
			}

			^[-2].side-right ^[-2..-1] {
				padding-left: 24px;
			}

			&.hittage {
				display: inline-block;
				min-width: 105px;
			}
		}
	}
}
</style>
