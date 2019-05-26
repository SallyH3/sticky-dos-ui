export const setCardList = cardList =>{
         console.log("VIP List", cardList)
         return {
           type: "SET_CARDLIST",
           cardList
         }};

export const deleteCard = (id) => ({
	type: 'DELETE_CARD',
	id
})