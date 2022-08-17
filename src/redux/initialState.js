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


export const initialState = (state) => state || defaultStore
