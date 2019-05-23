const initialState = [];

export const setCardList = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CARDLIST':
			return action.cardList
		case 'DELETE_CARD':
			return state.filter(card => card.id !== action.id)
		default: 
			return state;
	}
}