import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCard } from '../../actions';
import { NavLink } from 'react-router-dom';

export class Card extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleClick = () => {
    this.deleteCard(this.props.id)

  }

  deleteCard = (id) => {
    const url = `http://localhost:3001/api/v1/cardList/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    this.props.deleteCard(id)
  };

  mapListItems = (content) => {
    console.log('this is a listItem', content)
    return content.map(li => (
      <p className="listItem">
        {!li.checked 
          && <i class="far fa-square" />}
        {li.checked 
          && <i class="fas fa-check-square" />}
        {li.text}
      </p>
    ));
  }

  

  render() {
    console.log(this.props)
    const {title, content, id} = this.props
    return (
      <article className="Card">
        <button onClick={this.handleClick} className="Card__trash">
          <i class="fas fa-trash" />
        </button>
        <NavLink to={`/notes/${id}`}>
          <section className="Card__header">
            <h4>{title}</h4>
          </section>
          <div className="content">
            {content[0].type === "note" && <p>{content[0].text}</p>}
            {content[0].type === "list" && this.mapListItems(content)}
          </div>
        </NavLink>
      </article>
    );
  }
}

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id))
})

export default connect(null, mapDispatchToProps)(Card)