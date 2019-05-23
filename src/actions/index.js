export const setCardList = (cardList) => ({
	type: 'SET_CARDLIST',
	cardList
})

export const deleteCard = (id) => ({
	type: 'DELETE_CARD',
	id
})