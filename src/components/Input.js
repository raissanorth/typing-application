import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: '' }
  }

onInputChange(input) {

  this.setState({input});
  this.props.onChange(input);

  }

  render() {
    return (
      <div>
        <input className="text-input" value={this.state.input} onChange={event => this.onInputChange(event.target.value)} /> 
      </div>

    );
  }
}

export default Input;