import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

onInputChange(input) {
  this.props.onChange(input);
  }

  render() {
    return (
      <div>
        <input className="text-input" value={this.props.input} onChange={event => this.onInputChange(event.target.value)} /> 
      </div>
    );
  }
}

export default Input;