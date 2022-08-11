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
		return this.$el.querySelector(selector);
	}

	addClass (classes) {
		return this.$el.classList.add(classes);
	}

	removeClass (classes) {
		return this.$el.classList.remove(classes);
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
