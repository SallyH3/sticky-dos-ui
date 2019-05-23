import React from 'react';
import Card from '../../containers/Card';

const DisplayField = ({cardList}) => {

	const displayCards = cardList.map(card => {
		return <Card {...card} />
	})

  return (
    <main className="DisplayField">
      {displayCards}
    </main>
  );
}

export default DisplayField;