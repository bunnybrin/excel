import { defaultTitle } from '@/constans';

import logoImg from '@/images/logo.svg'
import { ActiveRoute } from '@core/routes/ActiveRoute';
export function createHeader ({ title }) {
	return `
			<div class="info">
				<a href="${ActiveRoute.base}"><img src="${logoImg}" alt="logo"></a>
				
				<input type="text" class="input" value="${title || defaultTitle}" />
			</div>

      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
		
	`;
}
