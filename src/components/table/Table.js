import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor ($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown'],
		});
	}

	onMousedown (e) {
		if (e.target.dataset.resize) {
			resizeHandler(e, this.$root);
		}
	}

	toHTML () {
		return createTable();
	}
}
