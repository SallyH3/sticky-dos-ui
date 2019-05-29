import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { setCardList } from "../../actions";
import { dynamicFetch } from '../../utils/apicalls';
import PropTypes from 'prop-types';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: Date.now(),
      title: "",
      content: [{}],
      isList: false,
      listCount: 2,
      listInputs: [0]
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

    listInputs.push(listInputs.length);

    this.setState({listInputs});
  }

  removeListInput = (e) => {
    let {id} = e.target;
    let {listInputs} = this.state;
    let {content} = this.state;

    listInputs = listInputs.filter(el => {
      return el !== parseInt(id);
    });

    content = content.filter(lI => {
      return parseInt(lI.id) !== parseInt(id);
    });

    this.setState({listInputs, content});
  }

  handleListChange = e => {
    let { name, value, id } = e.target;
    let content = this.state.content;

    content[id] = {
      id,
      type: name,
      text: value,
      checked: false
    };

    this.setState({content})
  };

// Todo: Refactor to api file
  buildInit = () => {
    const { id, title, content } = this.state;
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        content
      })
    };
  };

  storeCard = () => {
    let {id, title, content} = this.state;
    let {cardList} = this.props;

    let newCardList = [...cardList, {id, title, content}];
    this.props.setCardList(newCardList);
  };

  postFetch = async () => {
    let init = this.buildInit();
    let url = "http://localhost:3001/api/v1/cardList";

    dynamicFetch(url, init)
      .then(result => this.storeCard(result))
      
  };

  handleSubmit = e => {
    e.preventDefault();

    this.postFetch();
    this.setState({ redirect: true });
  };

  mapLI = (lI) => {
    let icon = 
      <i
        key={`i-${lI}`}
        id={lI}
        onClick={(e) => this.removeListInput(e)}
        className="far fa-minus-square"
      />

    if (lI === 0) {
      icon =
        <i
          key={`i-0`}
          id={0}
          onClick={this.addListInput}
          className="far fa-plus-square"
        />
    }

    return (
      <span key={lI}>
        <input
          key={lI}
          id={lI}
          onChange={(e) => this.handleListChange(e)}
          name="list"
          maxLength="50"
          type="text"
          placeholder="Enter List Item"
        />
        {icon}
      </span>
    )
  }

  render() {
    let stringInput = (
      <fieldset className="Form__input-content">
        <input
          onChange={this.handleStrChange}
          name="note"
          type="text"
          maxLength="250"
          value={this.state.content[0].text}
          placeholder="Enter Body"
        />
      </fieldset>
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
            maxLength="50"
            value={this.state.title}
          />
          <fieldset className="Form__input-content">
            {this.state.isList && stringInput}
            {!this.state.isList && this.state.listInputs.map(lI => this.mapLI(lI))}
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

Form.propTypes= {
  cardList: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  setCardList: PropTypes.func
}