import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
          </tr>
        </thead>
        <tbody>
          {this.props.rows}
        </tbody>
      </table>
    )
  }
}

export default Table;