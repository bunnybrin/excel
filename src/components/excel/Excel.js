import { $ } from '@core/DQuery';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
	constructor (options) {
		this.components = options.components || [];
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	getRoot () {
		const $root = $.create('div', 'excel');

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className);

			const component = new Component($el, {
				store: this.store,
			});
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});

		return $root;
	}

	init () {
		this.subscriber.subscribeComponents(this.components)
		this.components.forEach(Component => Component.init());
	}

	destroy () {
		this.subscriber.unsubscribeFromStore()
		this.components.forEach(Component => Component.destroy());
	}
}
