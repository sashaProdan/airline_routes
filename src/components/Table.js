import React, { Component } from 'react';

class Table extends Component {
  static defaultProps = {
    perPage: 25,
  }

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    }
  }

  nextPage = (event) => {
    event.preventDefault();
    this.setState({
      page: this.state.page + 1,
    })
  }

  previousPage = (event) => {
    event.preventDefault();
    this.setState({
      page: this.state.page - 1,
    })
  }

  render() {
    const headerCells = this.props.columns.map( (col) => {
      return <th key={col.name}>{ col.name }</th>;
    });

    const start = this.state.page * this.props.perPage;

    const rows = this.props.rows.slice(start, start + this.props.perPage)
    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              {headerCells}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div className="pagination">
          <p>
            Showing {start + 1}-{start + rows.length} of {this.props.rows.length} routes.
          </p>
          <p>
            <button 
              onClick={this.previousPage} 
              disabled={start === 0}
            >
              Previous Page
            </button>
            <button 
              onClick={this.nextPage} 
              disabled={start + rows.length >= this.props.rows.length}
            >
              Next Page
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export default Table;