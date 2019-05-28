import React from 'react';
import { shallow } from 'enzyme';
import { DisplayField, mapStateToProps } from './index.js';
import Card from '../../containers/Card';
import { cardList } from '../../actions';
import { mockCardList } from '../../utils/mockData.js';

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