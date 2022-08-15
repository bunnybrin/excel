import { $ } from '@core/DQuery';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
	constructor (selector, options) {
		this.$el = $(selector);
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

	render () {
		this.$el.append(this.getRoot());

		this.subscriber.subscribeComponents(this.components)
		this.components.forEach(Component => Component.init());
	}

	destroy () {
		this.subscriber.unsubscribeFromStore()
		this.components.forEach(Component => Component.destroy());
	}
}
