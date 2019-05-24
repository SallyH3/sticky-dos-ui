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

  

  render() {
    const {title, content, id} = this.props
    return (
      <article className="Card">
            <button onClick={this.handleClick} className="Card__trash">X</button>
        <NavLink to = {`/notes/${id}`}>
          <section className="Card__header">
            <h4>{title}</h4>
          </section>
          <div></div>
          <ul>
            <li>Test String 1</li>
            <li>
              <input type="checkbox" value="Test Checkbox" />
            </li>
          </ul>
        </NavLink>
      </article>
    )
  }
}

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id))
})

export default connect(null, mapDispatchToProps)(Card)