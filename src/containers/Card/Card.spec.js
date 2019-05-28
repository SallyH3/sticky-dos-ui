import React from 'react';
import { shallow } from 'enzyme';
import { Card, mapDispatchToProps } from './index.js';
import { cardList, deleteCard } from '../../actions';
import { NavLink } from 'react-router-dom';
import { mockCardList } from '../../utils/mockData.js';

const handleClick = jest.fn();

describe('Card', () => {
  let wrapper;
  let mockDeleteCard;

  beforeEach(() => {
    mockDeleteCard =jest.fn();
    wrapper = shallow(
      <Card 
        title={mockCardList[0].title}
        id={mockCardList[0].id}
        content={mockCardList[0].content}
        deleteCard={mockDeleteCard}
      />
    )
  })

  it('should match snapshot for note item', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for list item', () => {
    wrapper=shallow(
      <Card 
        title={mockCardList[1].title}
        id={mockCardList[1].id}
        content={mockCardList[1].content}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleClick', () => {
    wrapper.instance().handleClick();
    expect(mockDeleteCard).toHaveBeenCalledWith(mockCardList[0].id);
  });

  describe('mapDispatchToProps', () => {

    it('should call dispatch when using a function from MDTP', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = deleteCard(0);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteCard(0);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});