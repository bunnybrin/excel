class DQuery {
	constructor (selector) {
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	get data () {
		return this.$el.dataset;
	}

	get height () {
		return this.$el.clientHeight;
	}

	get width () {
		return this.$el.clientWidth;
	}

	html (html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}

		return this.$el.outerHTML.trim();
	}

	text (text) {
		if (typeof text === 'string') {
			if (this.$el.tagName === 'INPUT') {
				this.$el.value = text;
			} else {
				this.$el.textContent = text;
			}
			return this;
		}

		if (this.$el.tagName === 'INPUT') {
			return this.$el.value.trim();
		}

		return this.$el.textContent.trim();
	}

	clear () {
		this.html('');
		return this;
	}

	append (node) {
		if (node instanceof DQuery) {
			node = node.$el;
		}

		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}

		return this;
	}

	remove (node) {
		this.$el.removeChild(node);

		return this;
	}

	cellId () {
		const parsed = this.$el.dataset.id.split(':');
		return {
			row: +parsed[0],
			col: +parsed[1],
		};
	}

	focus () {
		// const end = this.$el.value.length;

		// this.$el.setSelectionRange(end, end);
		this.$el.focus();
		return this;
	}

	on (eventType, cb) {
		this.$el.addEventListener(eventType, cb);
	}

	off (eventType, cb) {
		this.$el.removeEventListener(eventType, cb);
	}

	getMetrix () {
		return this.$el.getBoundingClientRect();
	}

	findAll (selector) {
		return this.$el.querySelectorAll(selector);
	}

	find (selector) {
		return $(this.$el.querySelector(selector));
	}

	addClass (classes) {
		this.$el.classList.add(classes);
		return this;
	}

	removeClass (classes) {
		this.$el.classList.remove(classes);
		return this;
	}

	closest (selector) {
		return $(this.$el.closest(selector));
	}

	css (styles = {}) {
		Object.assign(this.$el.style || {}, styles);
		return this;
	}
}

export function $ (selector) {
	return new DQuery(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);

	if (classes) {
		el.classList.add(classes);
	}

	return $(el);
};
