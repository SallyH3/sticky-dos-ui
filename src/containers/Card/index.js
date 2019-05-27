import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCard } from '../../actions';
import { Redirect } from 'react-router-dom';

export class Card extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
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
    return content.map(li => (
      <p key={li.id} className="listItem">
        {!li.checked && <i className="far fa-square" />}
        {li.checked && <i className="fas fa-check-square" />}
        {li.text}
      </p>
    ));
  }

  

  render() {
    const {title, content, id} = this.props

    if (this.state.redirect) {
      return <Redirect to={`/notes/${id}`} />;
    }

    return (
      <article className="Card">
        <button onClick={()=> this.setState({redirect: true})}>
          <i className="fas fa-edit" />
        </button>
        <button onClick={this.handleClick} className="Card__trash">
          <i className="fas fa-trash" />
        </button>
          <section className="Card__header">
            <h4>{title}</h4>
          </section>
          <div className="content">
            {content[0].type === "note" && <p>{content[0].text}</p>}
            {content[0].type === "list" && this.mapListItems(content)}
          </div>
      </article>
    );
  }
}

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id))
})

export default connect(null, mapDispatchToProps)(Card)