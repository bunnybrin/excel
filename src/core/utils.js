export function capitalize (str = '') {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range (start, end) {
	if (end < start) [start, end] = [end, start];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function storage (key, data) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}

	localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual (a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function camelToDashCase (str) {
	return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles (styles = {}) {
	return Object.keys(styles).map(key => `${camelToDashCase(key)}: ${styles[key]}`).join(';');
}

export function debounce (fn, wait) {
	let timeout = null;
	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			// eslint-disable-next-line no-invalid-this
			fn.apply(this, args);
		};

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);
	};
}
