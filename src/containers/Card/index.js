import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deleteCard } from '../../actions';

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
    console.log('id passed down', id)
    const url = `http://localhost:3001/api/v1/cardList/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    this.props.deleteCard(id)
  };

  

  render() {
    const {title, content} = this.props
    return (
      <article className="Card">
        <section className="Card__header">
          <h4>{title}</h4>
          <button onClick={this.handleClick} className="Card__trash">X</button>
        </section>
        <div></div>
        <ul>
          <li>Test String 1</li>
          <li>
            <input type="checkbox" value="Test Checkbox" />
          </li>
        </ul>
      </article>
    )
  }
}

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id))
})

export default connect(null, mapDispatchToProps)(Card)