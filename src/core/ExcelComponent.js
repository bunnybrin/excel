import { DomListeners } from '@core/DomListeners';
import emitter from '@core/Emitter';

export class ExcelComponent extends DomListeners {
	constructor ($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || ''
		this.unsubscribers = []

		this.prepare()
	}

	prepare () {

	}
	toHTML () {
		return '';
	}

	$emit (eventName, ...rest) {
		emitter.emit(eventName, ...rest)
	}

	$on (eventName, cb) {
		this.unsubscribers.push(emitter.subscribe(eventName, cb))
	}

	init () {
		this.initListeners()
	}

	destroy () {
		this.removeListeners()
		this.unsubscribers.forEach(fn => fn())
	}
}
