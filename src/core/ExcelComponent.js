import { DomListeners } from '@core/DomListeners';

export class ExcelComponent extends DomListeners {
	constructor ($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || ''
	}
	toHTML () {
		return '';
	}

	init () {
		this.initListeners()
	}

	destroy () {
		this.removeListeners()
	}
}
