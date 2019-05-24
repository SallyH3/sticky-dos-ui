import React, {Component} from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      title: '',
      body: [
        {}
      ]
    };
  }

  displayExpanded = () => {
    this.setState({ expanded: true });
  };

  handleTitleChange = (e) => {
    let {name, value} = e.target;

    this.setState({[name]: value})
  }

  handleStrChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      body: [
        {
          content: value,
          id: Date.now(),
          type: name
        }
      ]
    });
  }

  handleListChange = () => {

  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    let defaultForm = (
      <form>
        <input
          onClick={this.displayExpanded}
          type="text"
          placeholder="Take a Note..."
        />
      </form>
    )

    // ?? If user types in listItem, render +1 input field for list item
    // ?? If user checks checkList, render input w/ class of listItem
      // ?? Else render input w/ class of stringItem

// Todo: handleChanges on inputs, set to state
// - Then, send in fetch POST

    let expandedForm = (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          onChange={this.handleTitleChange}
          type="text"
          placeholder="Enter Title"
          value={this.state.title}
        />
        <input 
          onChange={this.handleStrChange} 
          name="stringItem" 
          type="text" 
          value={this.state.body[0].content} 
          placeholder="Enter Body" />
        <label htmlFor="checkList"> Click for List Item </label>
        <input type="checkbox" id="checkList" />
        <input type="submit" />
      </form>
    );

    return (
      <section>
        {!this.state.expanded && defaultForm}
        {this.state.expanded && expandedForm}
      </section>
    );
  }
}

export default Form;