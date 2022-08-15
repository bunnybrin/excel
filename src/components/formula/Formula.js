import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/DQuery';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor ($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			store: options.store,
		});
	}

	init () {
		super.init();
		const input = this.$root.find('[data-id="formula"]');
		this.$on('table:select', text => input.text(text));
	}

	storeChanged ({ currentText }) {
		this.$root.find('[data-id="formula"]').text(currentText);
	}

	onInput (e) {
		this.$emit('formula:input', $(e.target).text());
	}

	onKeydown (e) {
		const keys = ['Tab', 'Enter'];
		if (keys.includes(e.key)) {
			e.preventDefault();
			this.$emit('formula:done');
		}
	}

	toHTML () {
		return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false" data-id="formula"></div>
		`;
	}
}
