import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { debounce, storage } from '@core/utils';
import { initialState } from '@/redux/initialState';

function storageName (params) {
	return `excel:${params}`;
}

export class ExcelPage extends Page {
	getRoot () {
		const state = storage(storageName(this.params));
		const store = createStore(rootReducer, initialState(state));

		const stateListeners = debounce((state) => {
			storage(storageName(this.params), state);
		}, 300);

		store.subscribe(stateListeners);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender () {
		this.excel.init();
	}

	destroy () {
		this.excel.destroy();
	}
}
