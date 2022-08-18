import { $ } from '@core/DQuery';

export class TableSelection {
	static activeClassName = 'selected';

	constructor () {
		this.group = [];
		this.current = null;
		this.firstSelected = null; // need for multiselect
		this.selectedCellsEl = null;
	}

	get selectedIds () {
		return this.group.map(el => el.cellId(true));
	}

	setSelectedElement () {
		this.selectedCellsEl = $(document.querySelector('[data-select-cell]'));
	}

	setFirstSelected (val = null) {
		this.firstSelected = val;
	}

	select ($el) {
		this.clear();
		this.setFirstSelected();
		this.group.push($el);
		this.current = $el;
		$el.focus().addClass(TableSelection.activeClassName);
		this.addDecorationToSelect();
	}

	clear () {
		this.group.forEach(el => el.removeClass(TableSelection.activeClassName));
		this.group = [];
	}

	selectGroup ($group, curr) {
		if (curr) {
			this.current = curr;
			curr.focus();
		}

		this.clear();
		this.group = $group;
		this.group.forEach(el => el.addClass(TableSelection.activeClassName));
		this.addDecorationToSelect();
	}

	applyStyle (style) {
		this.group.forEach(el => el.css(style));
	}

	addDecorationToSelect () {
		const firstEl = this.group[0];
		const lastEl = this.group[this.group.length - 1];

		const left = firstEl.$el.offsetLeft;
		const top = firstEl.$el.offsetTop;

		const width = lastEl.$el.offsetLeft + lastEl.$el.offsetWidth - left;
		const height = lastEl.$el.offsetTop + lastEl.$el.offsetHeight - top;

		this.selectedCellsEl.css({
			left: left + 'px',
			top: top + 'px',
			width: width + 'px',
			height: height + 'px',
		});
	}
}
