import { ExcelComponent } from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
	constructor (...props) {
		super(...props);
	}

	get template () {
		return JSON.stringify(this.state, null, 2)
	}

	initialState (initialState) {
		this.state = { ...initialState };
	}

	setState (newState) {
		this.state = { ...this.state, ...newState };
		this.$root.html(this.template)
	}
}
