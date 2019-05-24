import { setCardList } from './cardList';
import * as actions from '../actions';

describe('cardList', () => {
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