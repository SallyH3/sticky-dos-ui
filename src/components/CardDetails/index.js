import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './_CardDetails.scss'
import { deleteCard, updateCard } from '../../actions';
import {postFetch} from '../../utils/apicalls';
import PropTypes from 'prop-types';

  
export class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      updatedCard: {
        title: this.props.title,
        id: this.props.id,
        content: this.props.content 
      }
    };
  }
  
  handleClick = () => {
    this.setState({ redirect: true });
  }

  handleDeleteCard = (id) => {
    const url = `http://localhost:3001/api/v1/cardList/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    this.props.deleteCard(id)
  };

  handleTitleChange = (e) => {
    let {value} = e.target;
    let updatedCard = this.state.updatedCard;

    updatedCard.title = value;

    this.setState({updatedCard});
  }
  
  handleCheck = (li) => {
    let status = li.checked;

    let updatedCard = this.state.updatedCard;
    updatedCard.content.map(item => {
      if (li.id == item.id) {
        item.checked = !status;
      }
    })

    this.setState({updatedCard});
  }

  handleLIChange = (e, li) => {
    let {value} = e.target;
    let updatedCard = this.state.updatedCard;

    updatedCard.content.map(item => {
      if (li.id == item.id) {
        return li.text = value;
      }
    });

    this.setState({updatedCard})
  }
  
  mapListItems = (content) => {
    return content.map(li => (
      <fieldset className="f-li" key={li.id}>
        {!li.checked && (
          <i 
            id={"check"+li.id}
            className="far check-btn  fa-square"
            onClick={() => this.handleCheck(li)}
          />
        )}
        {li.checked && (
          <i
            id={"check"+li.id}
            className="fas check-btn fa-check-square"
            onClick={() => this.handleCheck(li)}
          />
        )}
        <input id={"input"+li.id} type="text" value={li.text} onChange={(e) => this.handleLIChange(e, li)} />
      </fieldset>
    ));
  }

  buildInit = () => {
    return {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.updatedCard)
    }
  }

  handleSave = (e, id) => {
    e.preventDefault();
    let URL = `http://localhost:3001/api/v1/cardList/${id}`;
    let init = this.buildInit();

    postFetch(URL, init)
    this.props.updateCard(this.state.updatedCard)
  }
  
  render() {
    const { title, content, id } = this.props;

    if (this.state.redirect) {
      this.handleDeleteCard(this.props.id);
      return <Redirect to="/" />;
    }

      return (
        <article className="big-card">
          <form>
            <fieldset className="Card__header">
              <input 
                type="text" 
                className="title" 
                placeholder={title} 
                value={this.state.updatedCard.title} 
                onChange={this.handleTitleChange} 
              />
              <input className="Card__save" type="submit" onClick={(e) => this.handleSave(e, id)} />
              <button onClick={this.handleClick} className="Card__trash">
                <i class="far fa-trash-alt"></i>
              </button>
            </fieldset>
            <fieldset className="content">
              {content[0].type === "list" && this.mapListItems(content)}
            </fieldset>
          </form>
        </article>
      );
    }
  } 

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id)),
  updateCard: (card) => dispatch(updateCard(card))
})

export default connect(null, mapDispatchToProps)(CardDetails);

CardDetails.propTypes = {
  content: PropTypes.array,
  deleteCard: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  updateCard: PropTypes.func
}