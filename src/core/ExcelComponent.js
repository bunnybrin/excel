import { DomListeners } from '@core/DomListeners';
import emitter from '@core/Emitter';

export class ExcelComponent extends DomListeners {
	constructor ($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.store = options.store;
		this.subscribe = options.subscribe || [];
		this.unsubscribers = [];
		this.prepare();
	}

	prepare () {

	}

	toHTML () {
		return '';
	}

	$emit (eventName, ...rest) {
		emitter.emit(eventName, ...rest);
	}

	$on (eventName, cb) {
		this.unsubscribers.push(emitter.subscribe(eventName, cb));
	}

	$dispatch (action) {
		this.store.dispatch(action);
	}

	storeChanged () {}

	isWatching (key) {
		return this.subscribe.includes(key)
	}

	init () {
		this.initListeners();
	}

	destroy () {
		this.removeListeners();
		this.storeSub();
	}
}
