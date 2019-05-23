import React, {Component} from 'react';

class Card extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <article className="Card">
        <section className="Card__header">
          <h2>Title</h2>
          <button className="Card__trash">X</button>
        </section>
        <div></div>
        <ul>
          <li>Test String 1</li>
          <li>
            <input type="radio" value="Test Checkbox" />
          </li>
        </ul>
      </article>
    )
  }
}

export default Card;