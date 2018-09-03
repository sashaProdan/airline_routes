import React, { Component } from 'react';
import './App.css';
import DATA from './data';
import Table from './components/Table';
import Select from './components/Select';

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

  changeAirline = (value) => {
    if (value !== 'all') {
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

    const filteredAirlines = DATA.airlines;

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
          <p>
            <label htmlFor="airline">Show routes on</label>
            <Select 
              options={filteredAirlines} 
              valueKey="id" 
              titleKey="name"
              allTitle="All Airlines" 
              value={this.state.airline} 
              onSelect={this.changeAirline} 
            />
            <label htmlFor="airport">flying in or out of</label>
            <select 
              id="airport" 
              value={this.state.airport}
            >
              <option value={this.defaultState.airport}>All Airports</option>
              {airports}
            </select>
            <button>Show All Routes</button>
          </p>
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