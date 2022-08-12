import { range } from '@core/utils';

export function shouldResize (e) {
	return e.target.dataset.resize;
}

export function isCell (e) {
	return e.target.dataset.id;
}

export function getSelectors (el1, el2) {
	const target = el1.cellId()
	const current = el2.cellId()

	const cols = range(current.col, target.col);
	const row = range(current.row, target.row);

	return cols.reduce((acc, current) => {
		row.forEach(n => acc.push(`[data-id="${n}:${current}"]`));
		return acc;
	}, []).join(',');
}

export function nextCell (key, { row, col }) {
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++;
			break;

		case 'Tab':
		case 'ArrowRight':
			col++;
			break;

		case 'ArrowUp':
			row--;
			break;
		case 'ArrowLeft':
			col--;
			break;
	}
	return { row, col };
}
