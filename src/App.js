import React, { Component } from 'react';
import './App.css';
import DATA from './data';
import Table from './components/Table';

class App extends Component {
  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];
    const rows = DATA.routes.slice(0, 200).map((route, i) => {
      let airline = DATA.getAirlineById(route.airline);
      let src = DATA.getAirportByCode(route.src);
      let dest = DATA.getAirportByCode(route.dest);
      return (
        <tr>
          <td>{airline.name}</td>
          <td>{src.name}</td>
          <td>{dest.name}</td>
        </tr>
      );
    });
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <img className="map" src="./equirectangular_world.jpg" alt="Airline routes" />
          <Table 
            className="routes-table"
            columns={columns}
            rows={rows}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;