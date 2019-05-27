import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './_CardDetails.scss'
import Header from '../Header';
import { deleteCard } from '../../actions';
  
export class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      redirect: false,
      updatedCard: {...this.props}
    };
  }
  
  handleClick = () => {
    console.log('DELETE')
    // this.props.deleteCard(id)
    this.setState({ redirect: true });
  }

  deleteCard = (id) => {
    const url = `http://localhost:3001/api/v1/cardList/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    this.props.deleteCard(id)
  };
  
  handleCheck = (li) => {
    console.log('li ID', li.id)
    let status = li.checked;
    status = !status;

    let updatedCard = this.state.updatedCard;
    updatedCard.content.map(item => {
      console.log('in map',item.id)
      if (li.id == item.id) {
        item.checked = status;
      }
    })

    this.setState({updatedCard});
  }
  
  mapListItems = (content) => {
    console.log(content)

    return content.map(li => (
      <fieldset>
        {!li.checked && (
          <i
            className="far check-btn  fa-square"
            onClick={() => this.handleCheck(li)}
          />
        )}
        {li.checked && (
          <i
            className="fas check-btn fa-check-square"
            onClick={() => this.handleCheck(li)}
          />
        )}
        <input type="text" value={li.text} />
      </fieldset>
    ));
  }

  handleSave = () => {

  }
  
  render() {
    const { title, content, id } = this.props;
    console.log('detailSTATE', this.state)

    if (this.state.redirect) {
      console.log('Is it triggering')
      this.deleteCard(this.props.id);
      return <Redirect to="/" />;
    }       
      
      console.log('checkmarks', content[0].checked)

      return (
        <article className="big-card">
          <form>
            <fieldset className="Card__header">
              <input className="title" value={title} />
              <button onClick={this.handleClick} className="Card__trash">
                X
              </button>
              <input type="submit" onClick={this.handleSave} />
            </fieldset>
            <div className="content">
              {content[0].type === "list" && this.mapListItems(content)}
            </div>
          </form>
        </article>
      );
    }
  } 
  
// export const mapStateToProps = (state) => ({
//   // cardList: state.cardList
// })

export const mapDispatchToProps =(dispatch) => ({
  deleteCard: (id) => dispatch(deleteCard(id))
})

export default connect(null, mapDispatchToProps)(CardDetails);