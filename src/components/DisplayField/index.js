import React from 'react';
import Card from '../../containers/Card';
import { connect } from 'react-redux'; 

export const DisplayField = (props) => {

	console.log(props.cardList)

	const displayCards = props.cardList.map(card => {
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

