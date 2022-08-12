import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@/core/DQuery';
import { getSelectors, isCell, nextCell, shouldResize } from '@/components/table/table.functions';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor ($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
		});

		this.rowsCount = 15;
		this.colsCount = 26;
		// @todo Magic Number. merge this logic and logic from table.template (codes.z - codes.a + 1)
		// @todo add logic work with cell edit like goggle excel
	}
	prepare () {
		this.selections = new TableSelection();
	}

	init () {
		super.init();
		const $cell = this.$root.find(`[data-id="0:0"]`);

		this.selectCell($cell)

		this.$on('formula:input', data => this.selections.current.text(data));

		this.$on('formula:done', _ => this.selections.current.focus());
	}

	onKeydown (e) {
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
		if (keys.includes(e.key) && !e.shiftKey) {
			e.preventDefault();
			const { row, col } = nextCell(e.key, this.selections.current.cellId());

			if (row >= 0 && row < this.rowsCount && col >= 0 && col < this.colsCount) {
				const selector = `[data-id="${row}:${col}"]`;
				const $next = this.$root.find(selector)
				this.selectCell($next)
			}
		}
	}

	onMousedown (e) {
		if (shouldResize(e)) {
			resizeHandler(e, this.$root);
		}

		if (isCell(e)) {
			const $target = $(e.target);
			if (e.shiftKey) {
				const groups = [...this.$root.findAll(getSelectors(this.selections.current, $target))].map(el => $(el));

				this.selections.selectGroup(groups);
			} else this.selectCell($target);
		}
	}

	onInput (e) {
		this.$emit('table:input', $(e.target).text() )
	}

	selectCell ($cell) {
		this.selections.select($cell);
		this.$emit('table:select', $cell.text());
	}

	toHTML () {
		return createTable(this.rowsCount);
	}
}
