import React, { Component } from 'react';
import Header from '../../components/Header';
import DisplayField from '../../components/DisplayField';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardList: []
    }
  }

componentDidMount = () => {
  const url = 'http://localhost:3000/api/v1/cardList'
  fetch(url)
  .then(response => response.json())
  .then(cardList => this.setState({ cardList }))
  .catch(error => alert('Error fetching data'))
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
    console.log('state', this.state.cardList)
    return (
      <div className="App">
        <Header />
        <DisplayField />
        <div className="BG"></div>
      </div>
    )
  }
}

export default App;
