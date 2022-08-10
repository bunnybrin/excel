const codes = {
	a: 65,
	z: 90,
};

function toCell () {
	return `
		<div class="cell" contenteditable></div>
	`;
}

function createCol (content) {
	return `
		<div class="column">${content}</div>
	`;
}

function createRow (content, index = '') {
	return `
		<div class="row">
			<div class="row-info">${index}</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar (_, index) {
	return String.fromCharCode(codes.a + index);
}

export function createTable (rowsCount = 15) {
	const colsCount = codes.z - codes.a + 1;
	const cols = new Array(colsCount).fill('')
		.map(toChar)
		.map(createCol)
		.join('');
	const rows = [];

	rows.push(createRow(cols));

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount).fill('')
			.map(toCell)
			.join('')
		rows.push(createRow(cells, i + 1));
	}
	return rows.join('');
}
