const initialState = [];

export const setCardList = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CARDLIST':
			return action.cardList
		case 'DELETE_CARD':
      return state.filter(card => card.id !== action.id);
    case 'UPDATE_CARD':
      return state.map(card => {
        if (card.id === action.card.id) {
          return card = action.card;
        } else {
          return card
        }
      });
		default: 
			return state;
	}
}