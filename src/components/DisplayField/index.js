import React from 'react';
import Card from '../../containers/Card';
import { connect } from 'react-redux'; 

export const DisplayField = (props) => {

	console.log('props', props.cardList)

	const displayCards = props.cardList.map(card => {
    console.log('card', card)
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

export default connect(mapStateToProps)(DisplayField)

