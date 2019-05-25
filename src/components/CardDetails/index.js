import React, {Component} from 'react';
import { connect } from 'react-redux';
import './_CardDetails.scss'
import Header from '../Header';

export class CardDetails extends Component {
  constructor() {
    super();
    this.state={
      edit: false
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
  }

  handleEdit = () => {
    console.log(this.props.id)
    if (this.state.edit === true) {
      this.setState({edit: false})
    } else {
      this.setState({edit: true})
    }
  }



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
    const { title, content, id } = this.props
    const canNotEdit =  <article className="big-card">
          <section className="Card__header">
            <h3> {title} </h3>
            <button onClick={this.handleClick} className="Card__trash">X</button>
            <button onClick={this.handleEdit}>Edit</button>
          </section>
          <div className="content">
            {content[0].type === "note" && <p>{content[0].text}</p>}
            {content[0].type === "list" && this.mapListItems(content)}
          </div>
        </article>
    const canEdit =         
      <article className="big-card">
          <section className="Card__header">
            <input className='title' placeholder={title} />
            <button onClick={this.handleClick} className="Card__trash">X</button>
            <button onClick={this.handleEdit}>Save</button>
          </section>
          <div className="content">
            {content[0].type === "note" && <input placeholder={content[0].text} />}
            {content[0].type === "list" && this.mapListItems(content)}
          </div>
        </article>
    
      const display = this.state.edit ? canEdit : canNotEdit;
    return(
      <div>
        <Header />
        <main>
          {display}
        </main>
      </div>
    )
  }
} 

export default CardDetails;
// export const mapStateToProps = (state) => ({
//   cardList: state.cardList
// })

// export default connect(mapStateToProps)(CardDetails)