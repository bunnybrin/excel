import { storage } from '@core/utils';
import { formatDate } from '@/constans';

function mapRecords (key) {
	const model = storage(key);
	const id = key.split(':')[1];
	return `
		  <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong><time datetime="${id}">${new Date(+id).toLocaleString('ru-RU', formatDate)}</time></strong>
      </li>
	`;
}

function getAllKeys () {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (!key.includes('excel')) continue;

		keys.push(key);
	}

	return keys;
}

export function createRecordsTable () {
	const keys = getAllKeys();

	if (!keys.length) {
		return `<p> You don't have any tables created yet</p>`;
	}
	return `
		<h3 class="db__table-title"> Your tables: </h3>
	  <div class="db__list-header">
	    <span>Name</span>
	    <span>Date</span>
	  </div>
		
	  <ul class="db__list">
			${keys.map(mapRecords).join('')}
		</ul>
	`;
}
