import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constans';

const defaultStore = {
	title: defaultTitle,
	colState: {},
	rowState: {},
	dataState: {},
	currentText: '',
	currentStyles: defaultStyles,
	stylesState: {},
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultStore;
