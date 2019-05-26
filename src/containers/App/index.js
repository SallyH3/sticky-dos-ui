import React, { Component } from 'react';
import Header from '../../components/Header';
import DisplayField from '../../components/DisplayField';
import { connect } from 'react-redux';
import { setCardList } from '../../actions';
import { Route } from 'react-router-dom';
import Form from '../Form';
import CardDetails from '../../components/CardDetails';
import { fetchCardList } from '../../utils/apicalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      cardList: []
    }
  }

componentDidMount = () => {
  const url = 'http://localhost:3001/api/v1/cardList/'
  fetchCardList(url)
  .then(result => 
    this.handleCardList(result.cardList)
    )
 
}

handleCardList = (cardList) => {
  console.log(cardList)
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
    return (
      <div className="App">
        <Route exact path = '/' component = { DisplayField } />
        <Route path = '/' component = { Header } />
        <Route exact path = '/new-note' component = { Form } />
        <Route exact path = '/new-note' component = { DisplayField } />
        <Route exact path = '/notes/:id' render = {({ match }) => {
          const selectedCard = this.props.cardList.find(card => {
            return card.id === parseInt(match.params.id)
            
          })
        
          if(selectedCard) {
            return <CardDetails 
              { ...selectedCard}
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
