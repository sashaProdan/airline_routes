import React, { Component } from 'react';
import './App.css';
import Data from './data';

class App extends Component {
  render() {
    const rows = Data.routes.map(route => {
      let airline = Data.getAirlineById(route.airline);
      let src = Data.getAirportByCode(route.src);
      let dest = Data.getAirportByCode(route.dest);
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
          <img src="./equirectangular_world.jpg" alt="Airline routes" />
          <table className="routes-table">
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;