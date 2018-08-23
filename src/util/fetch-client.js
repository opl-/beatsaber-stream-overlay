import {stringifyQuery} from './index';

// eslint-disable-next-line import/prefer-default-export
export function fetchData(opts) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
			resolve(JSON.parse(xhr.responseText));
		});

		xhr.addEventListener('error', () => reject());
		xhr.addEventListener('abort', () => reject('abort'));

		xhr.open(opts.method || 'GET', `/_/v1/${opts.endpoint}${opts.query ? `?${stringifyQuery(opts.query)}` : ''}`);

		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.send(Object.prototype.toString.call(opts.payload) === '[object Object]' ? JSON.stringify(opts.payload) : opts.payload);
	});
}
