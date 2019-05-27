import React, {Component} from 'react';
import Card from '../../containers/Card';
import { connect } from 'react-redux'; 
import {fetchCardList} from '../../utils/apicalls';
import { setCardList } from "../../actions";

export class DisplayField extends Component {
  constructor(props) {
    super(props)

  }

  handleCardList = (cardList) => {
    this.props.setCardList(cardList)
  }
  
  render() {
    let displayCards = this.props.cardList.map(card => {
      console.log('this is the card', card)
      return <Card {...card} key={card.id}/>
    })
    return (
      <main className="DisplayField">
        {displayCards}
      </main>
    );
  }
}

export const mapStateToProps = (state) => ({
	cardList: state.cardList
})

export const mapDispatchToProps = dispatch => ({
  setCardList: cardList => dispatch(setCardList(cardList))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayField)