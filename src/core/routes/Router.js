import { $ } from '@core/DQuery';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Router {
	constructor (selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router')
		}

		this.$placeholder = $(selector)
		this.page = null
		this.routes = routes;
		this.changePageHandler = this.changePageHandler.bind(this)
		this.init()
	}

	init () {
		window.addEventListener('hashchange', this.changePageHandler)
		this.changePageHandler()
	}

	changePageHandler () {
		if (this.page) this.page.destroy()

		this.$placeholder.clear()

		const route = ActiveRoute.path.includes('excel') ? 'excel' : 'dashboard'

		const Page = this.routes[route];

		console.log(this);
		this.page = new Page(ActiveRoute.params)
		this.$placeholder.append(this.page.getRoot())

		this.page.afterRender()
	}

	destroy () {
		window.removeEventListener('hashchange', this.changePageHandler)
	}
}
