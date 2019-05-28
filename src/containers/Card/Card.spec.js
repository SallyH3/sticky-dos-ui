import React from 'react';
import { shallow } from 'enzyme';
import { Card, mapDispatchToProps } from './index.js';
import { cardList, deleteCard } from '../../actions';
import { NavLink } from 'react-router-dom';
import { mockCardList } from '../../utils/mockData.js';

const handleDeleteCard = jest.fn();
const handleClick = jest.fn();

describe('Card', () => {
  let wrapper;
  let deleteCard;

  beforeEach(() => {
    deleteCard =jest.fn();
    wrapper = shallow(
      <Card 
        title={mockCardList[0].title}
        id={mockCardList[0].id}
        content={mockCardList[0].content}
        deleteCard={deleteCard}
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
    expect(deleteCard).toHaveBeenCalledWith(mockCardList[0].id);
  });

})