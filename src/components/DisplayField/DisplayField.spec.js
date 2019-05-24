import React from 'react';
import { shallow } from 'enzyme';
import { DisplayField, mapStateToProps } from './index.js';
import Card from '../../containers/Card';
import { cardList } from '../../actions';

describe('DisplayField', () => {
  let wrapper;

  beforeEach(() => {
    wrapper=shallow(
      <DisplayField />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})