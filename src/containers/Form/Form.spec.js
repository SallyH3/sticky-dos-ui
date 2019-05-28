import React from 'react';
import { shallow } from 'enzyme';
import { Form } from './index.js';

describe('Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper=shallow(
      <Form />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it.skip('should handle title change', () => {

  });

 	it.skip('should handle type change', () => {

  });

  it.skip('should handle string change', () => {

  });

  it.skip('should handle list change', () => {

  });

  it.skip('should add list input', () => {

  });

  it.skip('should remove list input', () => {

  });

  it.skip('should handle submit', () => {

  });

  it.skip('should store card', () => {

  });

  
});