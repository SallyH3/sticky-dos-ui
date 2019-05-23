import { combineReducers } from 'redux';
import { setCardList } from './cardList'

export const rootReducer = combineReducers ({
	cardList: setCardList
})