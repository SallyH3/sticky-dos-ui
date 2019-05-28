import React, {Component} from 'react';
import Card from '../../containers/Card';
import { connect } from 'react-redux'; 
import {fetchCardList} from '../../utils/apicalls';
import { setCardList } from "../../actions";
import PropTypes from 'prop-types';

export const DisplayField = (props) => {

  // handleCardList = (cardList) => {
  //   this.props.setCardList(cardList)
  // }
  
  let displayCards = props.cardList.map(card => {
    return <Card {...card} key={card.id}/>
  })
  
  return (
    <main className="DisplayField">
      {displayCards}
    </main>
  );
}

export const mapStateToProps = (state) => ({
	cardList: state.cardList
})

export const mapDispatchToProps = dispatch => ({
  setCardList: cardList => dispatch(setCardList(cardList))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayField)