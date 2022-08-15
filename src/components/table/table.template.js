import { toInlineStyles } from '@core/utils';
import { parseCell } from '@core/parseCell';

const cellSizes = {
	col: 120,
	row: 20,
};
const codes = {
	a: 65,
	z: 90,
};

function getSize (state = {}, index = 0, type = 'col') {
	const storeName = type + 'State';
	return (state[storeName][index] || cellSizes[type]) + 'px';
}

function getText (row, col, state) {
	return parseCell(state.dataState[`${row}:${col}`] || '');
}

function toChar (_, index) {
	return String.fromCharCode(codes.a + index);
}

function getStyle (row, col, state) {
	let styles = '';
	const id = state.stylesState[`${row}:${col}`]

	if (id) {
		styles = toInlineStyles(id) + ';'
	}

	return styles;
}

function toCell (row, col, state) {
	return `
		<div
			class="cell" 
			contenteditable 
			data-col="${col}" 
			data-id="${row}:${col}" 
			style="${getStyle(row, col, state)} width: ${getSize(state, col)}"
			>${getText(row, col, state)}</div>
	`;
}

function createCol (content, index, state) {
	return `
		<div 
			class="column" 
			data-type="resizable" 
			data-col="${index}" 
			style="width: ${getSize(state, index)}"
			>
				${content}
				<i class="col-resize" data-resize="col"></i>
		</div>
	`;
}

function createRow (content, index = 0, state) {
	return `
		<div class="row" 
			data-type="resizable" 
			data-row="${index}"
			${state && `style="height: ${getSize(state, index, 'row')}"`}
		>
			<div class="row-info">${index || ''} ${index && '<i class="row-resize" data-resize="row"></i>'}</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

export function createTable (rowsCount = 15, state) {
	const colsCount = codes.z - codes.a + 1;
	const cols = new Array(colsCount).fill('')
		.map(toChar)
		.map((col, i) => createCol(col, i, state))
		.join('');
	const rows = [];

	rows.push(createRow(cols));

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount).fill(i)
			.map((col, i) => toCell(col, i, state))
			.join('');
		rows.push(createRow(cells, i + 1, state));
	}
	return rows.join('');
}
