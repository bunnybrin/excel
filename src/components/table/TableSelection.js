export class TableSelection {
	static activeClassName = 'selected';

	constructor () {
		this.group = [];
		this.current = null;
	}

	get selectedIds () {
		return this.group.map(el => el.cellId(true))
	}

	select ($el) {
		this.clear();
		this.group.push($el);
		this.current = $el;
		$el.focus().addClass(TableSelection.activeClassName);
	}

	clear () {
		this.group.forEach(el => el.removeClass(TableSelection.activeClassName));
		this.group = [];
	}

	selectGroup ($group) {
		this.clear();
		this.group = $group;
		this.group.forEach(el => el.addClass(TableSelection.activeClassName));
	}

	applyStyle (style) {
		this.group.forEach(el => el.css(style))
	}
}
