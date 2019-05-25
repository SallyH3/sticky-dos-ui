import React, {Component} from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      isList: false,
      listCount: 2,
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

  isResponseOk = (response) => {
    if (response.status == 201) {
      console.log('ThisIs:', response)
      return response.json()
    } else {
      throw new Error('Failed to Post New Note!!')
    }
  }

  postFetch = (url, init) => {
    return fetch(url, init)
      .then(response => this.isResponseOk(response))
      .then(result => this.storeCard(result))
      .catch(error => console.log(error))
  }

  postCard = async () => {
    let init = this.buildInit();
    let url = "http://localhost:300/api/v1/cardList";

    this.postFetch(url, init);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.postCard();
  }

  mapListInputs = () => {
    let {listCount} = this.state;
    console.log("should be: ", listCount)
    let mapList = [];
    let input = (
      <input name="listItem" type="text" placeholder="Enter List Item" />
    );
    for (let i; i < listCount; i++) {
      mapList.splice(i, 0, input)
    }
    console.log('inMAP', mapList)
    return mapList;
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
        {this.state.isList && this.mapListInputs()}
        <input type="submit" value="SAVE" />
      </form>
    );
  }
}

export default Form;