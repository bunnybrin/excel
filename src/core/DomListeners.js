import { capitalize } from '@core/utils';

export class DomListeners {
	constructor ($root, listeners = []) {
		if (!$root) throw new Error('No $root provided for DOMListeners');

		this.$root = $root;
		this.listeners = listeners;
		this.boundListeners = [];
	}

	initListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);

			if (!this[method]) throw new Error(`Method ${method} is not implemented in ${this.name} Component`);

			const cb = this[method].bind(this);
			this.boundListeners.push({ eventName: listener, cb });
			this.$root.on(listener, cb);
		});
	}

	removeListeners () {
		this.boundListeners.forEach(({ eventName, cb }) => this.$root.off(eventName, cb));
	}
}

function getMethodName (eventName) {
	return 'on' + capitalize(eventName);
}
