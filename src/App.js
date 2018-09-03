import React, { Component } from 'react';
import './App.css';
import DATA from './data';
import Table from './components/Table';

class App extends Component {
  defaultState = {
    airline: 'all',
    airport: 'all',
  }

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  changeAirline = (event) => {
    const value = event.target.value;
    if (event.target.value !== 'all') {
      this.setState({airline: parseInt(value, 10)});
    } else {
      this.setState({airline: value});
    }
  }

  routeHasCurrentAirline = (route) => {
    return this.state.airline === 'all' ||
           this.state.airline === route.airline;
  }


  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const airlines = DATA.airlines.map(airline => {
      return (
        <option value={airline.id}>{airline.name}</option>
      )
    });

    const airports = DATA.airports.map(airport => {
      return (
        <option value={airport.name}>{airport.name}</option>
      )
    })
    const filteredRoutes = DATA.routes.filter( r => this.routeHasCurrentAirline(r));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <img className="map" src="./equirectangular_world.jpg" alt="Airline routes" />
          <div>
            <label htmlFor="airline">Show routes on</label>
            <select 
              id="airline" 
              value={this.state.airline} 
              onChange={this.changeAirline}
            >
              <option value={this.defaultState.airline}>All Airlines</option>
              {airlines}
            </select>
            <label htmlFor="airport">flying in or out of</label>
            <select 
              id="airport" 
              value={this.state.airport}
            >
              <option value={this.defaultState.airport}>All Airports</option>
              {airports}
            </select>
            <button>Show All Routes</button>
          </div>
          <Table 
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;