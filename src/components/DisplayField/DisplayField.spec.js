import React from 'react';
import { shallow } from 'enzyme';
import { DisplayField, mapStateToProps } from './index.js';
import Card from '../../containers/Card';
import { cardList } from '../../actions';

const mockCardList = [
  {
    id: 1,
    title: 'test',
    content: 'hello world'
  },
  {
    id: 2,
    title: 'test2',
    content: 'helloooo world' 
  }
]

describe('DisplayField', () => {
  let wrapper;

  beforeEach(() => {
    wrapper=shallow(
      <DisplayField cardList={mockCardList}/>
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})