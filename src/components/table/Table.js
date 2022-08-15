import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@/core/DQuery';
import { getSelectors, isCell, nextCell, shouldResize } from '@/components/table/table.functions';
import { applyStyle, changeCurrentStyles, changeText, tableResize } from '@/redux/actions';
import { defaultStyles } from '@/constans';
import { parseCell } from '@core/parseCell';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor ($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			store: options.store,
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

		this.selectCell($cell);

		this.$on('formula:input', data => {
			this.updateTextInStore(data);
		});

		this.$on('formula:done', _ => this.selections.current.focus());
		this.$on('toolbar:applyStyle', style => {
			this.selections.applyStyle(style);
			this.$dispatch(changeCurrentStyles(style));

			this.$dispatch(applyStyle({
				value: style,
				ids: this.selections.selectedIds,
			}));
		});
	}

	onKeydown (e) {
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
		if (keys.includes(e.key) && !e.shiftKey) {
			e.preventDefault();
			const { row, col } = nextCell(e.key, this.selections.current.cellId());

			if (row >= 0 && row < this.rowsCount && col >= 0 && col < this.colsCount) {
				const selector = `[data-id="${row}:${col}"]`;
				const $next = this.$root.find(selector);

				this.selectCell($next);
			}
		}
	}

	async resizeTable (e) {
		try {
			const data = await resizeHandler(e, this.$root);
			this.$dispatch(tableResize(data));
		} catch (e) {
			console.error('Resize error', e);
		}
	}

	onMousedown (e) {
		if (shouldResize(e)) {
			this.resizeTable(e);
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
		this.updateTextInStore($(e.target).text());
	}

	selectCell ($cell) {
		if (this.selections.current) {
			this.selections.current.text(parseCell(this.selections.current.text()));
		}
		this.selections.select($cell);
		const unparsedStr = this.store.getState().dataState[$cell.cellId(true)] || '';
		this.$emit('table:select', unparsedStr);
		this.selections.current.text(unparsedStr);
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(changeCurrentStyles(styles));
	}

	updateTextInStore (text) {
		this.selections.current.text(text);

		this.$dispatch(changeText({
			text,
			id: this.selections.current.cellId(true),
		}));
	}

	toHTML () {
		return createTable(this.rowsCount, this.store.getState());
	}
}
