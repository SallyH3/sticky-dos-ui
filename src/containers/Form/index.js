import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { setCardList } from "../../actions";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isList: false,
      listCount: 2,
      listInputs: [
        <input
          onChange={this.handleListChange}
          name="list"
          type="text"
          placeholder="Enter List Item"
        />
      ],
      title: "",
      content: [{}]
    };
  }

  handleTitleChange = e => {
    let { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleTypeChange = () => {
      this.setState({ isList: !this.state.isList });
  };

  handleStrChange = e => {
    let { name, value } = e.target;
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
  };

  handleListChange = e => {
    let { name, value } = e.target;
    
    let inputTag = this.state.listInputs[0];
    let inputsToRender = [inputTag, inputTag];

    console.log('This many inputs', inputsToRender.length)

    this.setState({content: [
      {
        id: Date.now,
        type: name,
        text: value,
        checked: false
      }
    ]})
  };

// Todo: Refactor to api file
  buildInit = () => {
    const { title, content } = this.state;
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content
      })
    };
  };

  storeCard = () => {
    let {title, content} = this.state;
    let {cardList} = this.props;
    let newCardList = [...cardList, {title, content}]
    console.log('propsCardList', newCardList)
    this.props.setCardList(newCardList)
  };

// Todo: Refactor to api file
  isResponseOk = response => {
    if (response.status == 201) {
      return response.json();
    } else {
      throw new Error("Failed to Post New Note!!");
    }
  };

// Todo: Refactor to api file
  postFetch = (url, init) => {
    return fetch(url, init)
      .then(response => this.isResponseOk(response))
      .catch(error => console.log("MayDay", error));
  };

  postCard = async () => {
    let init = this.buildInit();
    let url = "http://localhost:3001/api/v1/cardList";

    this.postFetch(url, init);
    this.storeCard(init.body);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.postCard();
    this.setState({ redirect: true });
  };

  mapListInputs = () => {
    return (
      <input
        onChange={this.handleListChange}
        name="list"
        type="text"
        placeholder="Enter List Item"
      />
    );
  };

  render() {
    // ?? If user types in listItem, render +1 input field for list item
    // Todo: handleChanges on inputs, set to state

    let stringInput = (
      <input
        onChange={this.handleStrChange}
        name="note"
        type="text"
        value={this.state.content[0].text}
        placeholder="Enter Body"
      />
    );

    let listInputs = this.state.listInputs;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    console.log("FormState", this.state);

    return (
      <section className="Form__Container">
        <button className="Form__changeType" onClick={this.handleTypeChange}>
          <i
            title="Click to change type of note"
            className="far fa-check-square"
          />
        </button>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            onChange={this.handleTitleChange}
            type="text"
            placeholder="Enter Title"
            value={this.state.title}
          />
          {!this.state.isList && stringInput}
          {this.state.isList && listInputs}
          <input type="submit" value="SAVE" />
        </form>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  cardList: state.cardList
});

export const mapDispatchToProps = (dispatch) => ({
  setCardList: (cardList) => dispatch(setCardList(cardList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);