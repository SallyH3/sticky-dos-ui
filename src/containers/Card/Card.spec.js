import React from 'react';
import { shallow } from 'enzyme';
import { Card, mapDispatchToProps } from './index.js';
import { cardList } from '../../actions';
import { NavLink } from 'react-router-dom';

let mockData = {
  id: 34,
  content: 'hello world',
  title: 'hello'
}

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Card mockData={mockData}/>
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})