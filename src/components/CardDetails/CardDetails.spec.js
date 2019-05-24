import React from 'react';
import { shallow } from 'enzyme';
import { CardDetails, mapStateToProps } from './index.js';

describe('CardDetails', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CardDetails />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})