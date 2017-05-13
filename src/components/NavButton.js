import React from 'react';

class NavButton extends React.Component {

  onClick(event) {
    this.props.onClick(event);
  }

  render() {
    return (
      <div>
        <button onClick={event => this.onClick(event)}>{this.props.title}</button>
      </div>
    );
  }
};


export default NavButton;