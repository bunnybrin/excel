import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { createHeader } from '@/components/header/header.template';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor ($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options,
		});
	}

	onInput (e) {
		this.$dispatch(changeTitle({ title: e.target.value }));
	}

	toHTML () {
		return createHeader(this.store.getState());
	}
}
