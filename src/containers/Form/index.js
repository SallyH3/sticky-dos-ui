import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { setCardList } from "../../actions";
import { postFetch } from '../../utils/apicalls';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      title: "",
      content: [{}],
      isList: false,
      listCount: 2,
      listInputs: [
        [
          <input
            key="0"
            id="0"
            onChange={this.handleListChange}
            name="list"
            type="text"
            placeholder="Enter List Item"
          />,
          <i
            key="i-0"
            id="0"
            onClick={this.addListInput}
            className="far fa-plus-square"
          />
        ]
      ]
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

  addListInput = () => {
    let {listInputs} = this.state;

    listInputs.push([
      <input
        key={listInputs.length}
        id={listInputs.length}
        onChange={this.handleListChange}
        name="list"
        type="text"
        placeholder="Enter List Item"
      />,
      <i
        key={`i-${listInputs.length}`}
        id={listInputs.length}
        onClick={this.removeListInput}
        className="far fa-minus-square"
      />
    ]);

    this.setState({listInputs});
  }

  removeListInput = () => {
    let {listInputs} = this.state

    listInputs.pop();

    this.setState({listInputs});
  }

  handleListChange = e => {
    let { name, value, id } = e.target;
    let content = this.state.content;

    content[id] = {
      id: Date.now(),
      type: name,
      text: value,
      checked: false
    };

    this.setState({content})
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

    let newCardList = [...cardList, {title, content}];
    this.props.setCardList(newCardList);
  };

  postFetch = async () => {
    let init = this.buildInit();
    let url = "http://localhost:3001/api/v1/cardList";

    postFetch(url, init)
      .then(result => this.storeCard(result))
      
  };

  handleSubmit = e => {
    e.preventDefault();

    this.postFetch();
    this.setState({ redirect: true });
  };

  render() {
    // Todo: If user types in listItem, render +1 input field for list item

console.log('FORM State: ', this.state)

    let stringInput = (
      <input
        onChange={this.handleStrChange}
        name="note"
        type="text"
        value={this.state.content[0].text}
        placeholder="Enter Body"
      />
    );

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <section className="Form__Container">
        <button
          className="Form__changeType"
          onClick={this.handleTypeChange}
        >
          <i
            title="Click to change type of note"
            className="far fa-check-square"
          />
        </button>
        <form onSubmit={this.handleSubmit}>
          <input
            className="Form__input-title"
            name="title"
            onChange={this.handleTitleChange}
            type="text"
            placeholder="Enter Title"
            value={this.state.title}
          />
          <fieldset className="Form__input-content">
            {this.state.isList && stringInput}
            {!this.state.isList && this.state.listInputs.map(lI => <span>{lI}</span>)}
          </fieldset>
          <input className="Form__submit" type="submit" value="SAVE" />
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