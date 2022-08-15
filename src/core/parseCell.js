export function parseCell (str) {
	let parsedStr = str
	if (str.toString().startsWith('=')) {
		try {
			parsedStr = eval(str.slice(1))
		} catch {
			return parsedStr;
		}
	}

	return parsedStr;
}
