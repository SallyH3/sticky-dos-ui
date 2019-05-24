import { setCardList } from './cardList';
import * as actions from '../actions';

describe('setCardList', () => {
  it('should return initialState', () => {
    let expected = []
    const result = setCardList(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return state with cards', () => {
    let cardList = [
      {
        title: 'hello',
        content: 'world'
      }
    ]
    const result = setCardList(undefined, actions.setCardList(cardList))

    const expected = cardList

    expect(result).toEqual(expected)
  })
})
describe('deleteCard', () => {
  it('should return cards if the ids do not match', () => {
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
    const expected = [
      {
        id: 5,
        title: 'hey',
        content: 'this is the content'
      }
    ]
    const result = setCardList(mockCardList, actions.deleteCard(3))

    expect(result).toEqual(expected)
  })
})