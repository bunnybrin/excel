import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/DQuery';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { defaultStyles } from '@/constans';

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar';

	constructor (props, options) {
		super(props, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
		});

		this.defaultStyles = { ...defaultStyles, ...options.store.getState().currentStyles };
	}

	get template () {
		return createToolbar(this.state);
	}

	prepare () {
		this.initialState(defaultStyles);
	}

	init () {
		super.init();
		this.setState(this.defaultStyles)
	}

	onClick (e) {
		const attrs = $(e.target).data;
		if (attrs.type === 'button') {
			const [key, val] = Object.entries(JSON.parse(attrs.value))[0];

			this.$emit('toolbar:applyStyle', { [key]: val });
		}
	}

	storeChanged ({ currentStyles }) {
		this.setState(currentStyles);
	}

	toHTML () {
		return this.template;
	}
}
