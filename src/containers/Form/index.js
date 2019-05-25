import React, {Component} from 'react';
import { postFetch } from '../../utils/apicalls';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      listCount: 1,
      title: "",
      content: [{}]
    };
  }


  handleTitleChange = (e) => {
    let {name, value} = e.target;

    this.setState({[name]: value})
  }

  handleStrChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      content: [
        {
          id: Date.now(),
          type: name,
          text: value,
          checked: false
        }
      ]
    });
  }

  handleListChange = () => {
    this.setState({isList: !this.state.isList})
  }

  buildInit = () => {
    const {title, content} = this.state;
    return {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        content
      })
    }
  }

  storeCard = (fetchedCard) => {
    console.log('storeCardFunc:', fetchedCard)
  }

  postFetch = () => {
    let init = this.buildInit();
    let url = "http://localhost:3001/api/v1/cardList";

    postFetch(url, init)
      .then(result => this.storeCard(result))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.postFetch();
  }

  mapListInputs = () => {
    return (
      <input 
        name="listItem"
        type="text" 
        placeholder="Enter List Item" />
    )
  }

  render() {
    // ?? If user types in listItem, render +1 input field for list item
    // ?? If user checks checkList, render input w/ class of listItem
      // ?? Else render input w/ class of stringItem
// Todo: handleChanges on inputs, set to state
// - Then, send in fetch POST

    let stringInput = (
      <input
        onChange={this.handleStrChange}
        name="stringItem"
        type="text"
        value={this.state.content[0].text}
        placeholder="Enter Body"
      />
    );

    let listInput = this.mapListInputs();

      console.log('FormState', this.state)

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          onChange={this.handleTitleChange}
          type="text"
          placeholder="Enter Title"
          value={this.state.title}
        />
        <button onClick={this.handleListChange}>
          <i class="far fa-check-square" />
        </button>
        {!this.state.isList && stringInput}
        {this.state.isList && listInput}
        <input type="submit" value="SAVE" />
      </form>
    );
  }
}

export default Form;