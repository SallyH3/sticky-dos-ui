import React from 'react';
import { shallow } from 'enzyme';
import Form from './index.js';

describe('Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper=shallow(
      <Form />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})