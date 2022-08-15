/* eslint-disable no-case-declarations */
import { CHANGE_TEXT, CHANGE_CURRENT_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE } from '@/redux/types';

export function rootReducer (state, action) {
	let prevState = null;
	switch (action.type) {
		case CHANGE_TITLE:
			return { ...state, title: action.data.title };
		case TABLE_RESIZE:
			const field = action.data.type === 'col' ? 'colState' : 'rowState';
			prevState = { ...state[field] } || {};
			prevState[action.data.id] = action.data.val;

			return { ...state, [field]: prevState };

		case CHANGE_TEXT:
			prevState = { ...state.dataState } || {};
			prevState[action.data.id] = action.data.text;
			return { ...state, currentText: action.data.text, dataState: prevState };

		case CHANGE_CURRENT_STYLES:
			return { ...state, currentStyles: action.data };
		case APPLY_STYLE:
			const stylesState = state.stylesState || {};
			action.data.ids.forEach(id => {
				stylesState[id] = { ...stylesState[id], ...action.data.value };
			});
			return { ...state, stylesState };
		default:
			return state;
	}
}
