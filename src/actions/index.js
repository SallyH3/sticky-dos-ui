export const setCardList = (cardList) => ({
	type: 'SET_CARDLIST',
	cardList
})

export const deleteCard = (id) => ({
	type: 'DELETE_CARD',
	id
})

export const updateCard = (card) => ({
  type: 'UPDATE_CARD',
  card
})