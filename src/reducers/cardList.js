const initialState = [];

export const setCardList = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CARDLIST':
			return action.cardList
		default: 
			return state;
	}
}