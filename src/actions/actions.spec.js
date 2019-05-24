import * as actions from './index.js';

describe('setCardList', () => {
  const mockCardList = [
    {
      id: 5,
      title: 'hey',
      content: 'this is the content'
    },
    {
      id: 3,
      title: 'hey there',
      content: 'yooooooo'
    }
  ]

  it('should return cardList with a type of SET_CARDLIST', () => {
    const expected = {
      type: 'SET_CARDLIST',
      cardList: mockCardList
  };
    const result = actions.setCardList(mockCardList)

    expect(result).toEqual(expected)
  })
})

describe('deleteCard', () => {

})