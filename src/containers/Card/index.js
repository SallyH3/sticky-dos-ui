import React, {Component} from 'react';

class Card extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const {title, content} = this.props
    return (
      <article className="Card">
        <section className="Card__header">
          <h4>{title}</h4>
          <button className="Card__trash">X</button>
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

export default Card;