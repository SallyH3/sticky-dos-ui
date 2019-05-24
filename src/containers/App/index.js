import React, { Component } from 'react';
import Header from '../../components/Header';
import DisplayField from '../../components/DisplayField';
import { connect } from 'react-redux';
import { setCardList } from '../../actions';
import { Route } from 'react-router-dom';
import Form from '../Form';
import CardDetails from '../../components/CardDetails';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      cardList: []
    }
  }

componentDidMount = () => {
  const url = 'http://localhost:3001/api/v1/cardList'
  fetch(url)
  .then(response => response.json())
  .then(result => 
    this.handleCardList(result.cardList)
    )
  .catch(error => alert('Error fetching data'))
}

handleCardList = (cardList) => {
this.props.setCardList(cardList)
this.setState({ cardList })
}

postTest = () => {
  const sample = {
    id: 3,
    title: 'yo',
    content: [{
      id: 1,
      type: 'string',
      text: 'sample string',
      checked: null
    }]
  }
}

  render() {
    // console.log('state', this.state.cardList)
    return (
      <div className="App">
        <Route path = '/' component = { DisplayField } />
        <Route path = '/' component = { Header } />
        <Route exact path = '/new-note' component = { Form } />
        <Route exact path = '/notes/:id' render = {({ match }) => {
          console.log('match', match)
          const selectedCard = this.props.cardList.find(card => {
            console.log('cardID', card.cardList.id)
            return card.cardList.id === parseInt(match.params.id)
          })
          console.log('selectedCard', selectedCard)
          if(selectedCard) {
            return <CardDetails 
              { ...selectedCard.cardList }
            />
          }
        }}
        />
        <Route exact path = {'/notes/id'} component = { CardDetails } />
        <div className="BG"></div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  cardList: state.cardList
})

export const mapDispatchToProps = (dispatch) => ({
  setCardList: (cardList) => dispatch(setCardList(cardList))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
