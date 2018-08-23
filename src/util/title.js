function getTitle(vm) {
	const {title} = vm.$options;

	if (title === undefined) return null;

	const computedTitle = typeof title === 'function' ? title.call(vm) : title;

	return computedTitle || 'Beat Saber overlay';
}

const clientTitleMixin = {
	mounted() {
		const title = getTitle(this);

		if (title !== null) document.title = title;
	},
};

export default clientTitleMixin;
