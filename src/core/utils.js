export function capitalize (str = '') {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range (start, end) {
	if (end < start) [start, end] = [end, start];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
