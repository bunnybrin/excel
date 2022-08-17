import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { createHeader } from '@/components/header/header.template';
import { $ } from '@core/DQuery';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor ($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options,
		});
	}

	onInput (e) {
		this.$dispatch(changeTitle({ title: e.target.value }));
	}

	onClick (e) {
		const el = $(e.target);

		if (el.data.button === 'remove') {
			const decision = confirm('Do you really want to delete this excel table?');
			if (decision) {
				localStorage.removeItem('excel:' + ActiveRoute.params)
				ActiveRoute.navigate('');
			}
		} else if (el.data.button === 'exit') {
			ActiveRoute.navigate('');
		}
	}

	toHTML () {
		return createHeader(this.store.getState());
	}
}
