import { Page } from '@core/Page';
import { $ } from '@core/DQuery';
import { createRecordsTable } from '@/components/dashboard/dashboard.functions';

export class DashboardPage extends Page {
	constructor (...params) {
		super(...params);
	}
	getRoot () {
		const now = Date.now().toString()
		return $.create('div', 'db').html(`
			<div class="db__header">
	      <h1>Excel Dashboard</h1>
	    </div>
	
	    <div class="db__new">
	      <div class="db__view">
	        <a href="#excel/${now}" class="db__create">
	          New <br /> Table
	        </a>
	      </div>
	    </div>
	
	    <div class="db__table db__view">
				${createRecordsTable()}
	    </div>
		`);
	}
}
