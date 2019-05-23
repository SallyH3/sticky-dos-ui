import React from 'react';
import Card from '../../containers/Card';

const DisplayField = ({cardList}) => {

	const displayCards = cardList.map(card => {
		return <Card {...card} key={card.id}/>
	})

  return (
    <main className="DisplayField">
      {displayCards}
    </main>
  );
}

export default DisplayField;