const codes = {
	a: 65,
	z: 90,
};

function toCell (_, index) {
	return `
		<div class="cell" contenteditable data-col="${index}"></div>
	`;
}

function createCol (content, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${content}
			<i class="col-resize" data-resize="col"></i>
		</div>
	`;
}

function createRow (content, index = '') {
	return `
		<div class="row" data-type="resizable">
			<div class="row-info">${index} ${index && '<i class="row-resize" data-resize="row"></i>'}</div>
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
