import React, {Component} from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      title: '',
      body: [
        {id: 0, content: '', type: 'string'}
      ]
    };
  }

  displayExpanded = () => {
    this.setState({ expanded: true });
  };

  handleTitleChange = () => {

  }

  handleStrChange = () => {

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

    let expandedForm = (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleTitleChange}
          type="text"
          placeholder="Enter Title"
          value={this.state.title}
        />
        <input type="text" placeholder="Enter Body" />
        <label for="checkList"> Click for List Item </label>
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