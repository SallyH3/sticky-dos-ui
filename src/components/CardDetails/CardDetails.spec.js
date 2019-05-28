import React from 'react';
import { shallow } from 'enzyme';
import { CardDetails, mapDispatchToProps } from './index.js';
import { deleteCard, updateCard } from '../../actions';
import { mockCardList } from '../../utils/mockData';
import { dynamicFetch } from '../../utils/apicalls.js';

let mockCard = mockCardList[1];
let mockState = {
  redirect: false,
  updatedCard: {
    title: mockCard.title,
    id: mockCard.id,
    content: mockCard.content       
	}
}
let handleDeleteCard = jest.fn()

describe('CardDetails', () => {
	let { title, content, id } = mockCard
	let mockDeleteCard;
  let wrapper;
  let expectedCard;


  beforeEach(() => {
  	expectedCard = mockState.updatedCard
  	mockDeleteCard = jest.fn()
    wrapper = shallow(
      <CardDetails 
      	title={title}
      	content={content}
      	id={id}
      	deleteCard={mockDeleteCard}
      	updateCard={updateCard}
      />
    )
   

  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should handleClick', () => {
  	expect(wrapper.state("redirect")).toEqual(false);
  	wrapper.find(".Card__trash").simulate('click');
  	expect(wrapper.state("redirect")).toEqual(true);
  });

  it('should update title state on input', () => {
  	let mockEvent = {
  		target: {
  			value: 'hello there'
  		}
  	};
  	expect(wrapper.state()).toEqual(mockState);
  	wrapper.instance().handleTitleChange(mockEvent);
  	expect(wrapper.state()).toEqual({
  		redirect: false,
 			updatedCard: {
    		title: 'hello there',
    		id: mockCard.id,
    		content: mockCard.content       
			}
		});
  });

  it('should update checkbox state on click', () => {
  	expect(wrapper.state()).toEqual(mockState);
  	wrapper.find("#check1").simulate('click');
  	wrapper.instance().handleCheck(content[0]);
  	expectedCard.content[0].checked= true;
  	expect(wrapper.state()).toEqual({
  		redirect: false,
 			updatedCard: expectedCard
		});
  });

  it('should be able to update li item', () => {
  	let mockEvent = {
  		target: {
  			value: 'hello world'
  		}
  	}
  	expectedCard.content[0].text = 'hello world';
  	expect(wrapper.state()).toEqual(mockState);
  	wrapper.instance().handleLIChange(mockEvent, content[0]); 
  	expect(wrapper.state()).toEqual({
  		redirect: false,
 			updatedCard: expectedCard
		});
  });

  it.skip('should delete card if it matches id', () => {
  	// wrapper.find(".Card__trash").simulate('click');
  	wrapper.instance().handleDeleteCard();
  	expect(deleteCard).toHaveBeenCalled();
  });

  it('should handle save', () => {
    const mockEvent = { target: {} }
    const dynamicFetch = jest.fn();

    expectedCard.content[0].text = 'hello world';
    expect(wrapper.state()).toEqual(mockState);
    wrapper.instance().handleSave(
     { preventDefault: () => {} } , content[0]);
    expect(dynamicFetch).toHaveBeenCalled();
  });

    describe('mapDispatchToProps', () => {
			const mockDispatch = jest.fn();
    	it('should call delete card dispatch when using a function from MDTP', () => {
      
      const actionToDispatch = deleteCard(0);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteCard(0);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    	it('should call update card dispatch when using a function from MDTP', () => {
    		const mockEvent = {
    			target: {
    				value: 'hello world'
    			}
    		};

    		expectedCard.content[0].text = 'hello world';
			  expect(wrapper.state()).toEqual(mockState);
		  	wrapper.instance().handleLIChange(mockEvent, content[0]); 
		  	expect(wrapper.state()).toEqual({
		  		redirect: false,
		 			updatedCard: expectedCard
				});
    		const actionToDispatch = updateCard(expectedCard);
    		const mappedProps = mapDispatchToProps(mockDispatch);
    		mappedProps.updateCard(expectedCard);

    		expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    	});
  });

});