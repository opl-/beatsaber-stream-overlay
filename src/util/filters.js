const MINUTE = 60000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function relativeTime(time) { // eslint-disable-line import/prefer-default-export
	const relative = Date.now() - time;

	if (relative < 0) return 'in the future';
	if (relative < 5000) return 'a few secs ago';
	if (relative < MINUTE) return `${Math.round(relative / 1000)} seconds ago`;
	if (relative < HOUR) return `${Math.round(relative / MINUTE)} minute${relative < 1.5 * MINUTE ? '' : 's'} ago`;
	if (relative < DAY - (0.5 * HOUR)) return `${Math.round(relative / HOUR)} hour${relative < 1.5 * HOUR ? '' : 's'} ago`;
	if (relative < 2 * DAY) return 'a day ago';

	const d = new Date(time);
	return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDate(timestamp) {
	const d = new Date(timestamp);

	return `${d.getDate()} ${MONTH_SHORT_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}
