import React, { Component } from 'react';

class Select extends Component {
  handleChange = (event) => {
    event.preventDefault();
    this.props.onSelect(event.target.value);
  }

  render() {
    const options = this.props.options.map( option => {
      return (
        <option
          key={option[this.props.valueKey]}
          value={option[this.props.valueKey]}
        >
          {option[this.props.titleKey]}
        </option>
      );
    });
    options.unshift(<option key="all" value="all">{this.props.allTitle}</option>);
    return (
      <select
        id="airline"
        value={this.props.value}
        onChange={this.handleChange}
      >
        {options}
      </select>
    );
  }
}

export default Select;