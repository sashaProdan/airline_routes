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
      value = parseInt(value, 10);
    }
    this.setState({airline: value});
  }

  changeAirport = (value) => {
    this.setState({airport: value});
  }

  routeHasCurrentAirline = (route) => {
    return this.state.airline === 'all' ||
           this.state.airline === route.airline;
  }
  
  routeHasCurrentAirport = (route) => {
    return this.state.airport === 'all' ||
           this.state.airport === route.src ||
           this.state.airport === route.dest;
  }

  resetFilters = (event) => {
    event.preventDefault();
    this.setState({...this.defaultState});
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredAirlines = DATA.airlines;

    const filteredAirports = DATA.airports;

    const filteredRoutes = DATA.routes.filter((r) => {
      return this.routeHasCurrentAirline(r) &&
             this.routeHasCurrentAirport(r);
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <img className="map" src="./equirectangular_world.jpg" alt="Airline routes" />
          <p>
            Show routes on
            <Select 
              options={filteredAirlines} 
              valueKey="id" 
              titleKey="name"
              allTitle="All Airlines" 
              value={this.state.airline} 
              onSelect={this.changeAirline} 
            />
            flying in or out of
            <Select 
              options={filteredAirports} 
              valueKey="code"
              titleKey="name"
              allTitle="All Airports" 
              value={this.state.airport} 
              onSelect={this.changeAirport} 
            />
            <button onClick={this.resetFilters}>Show All Routes</button>
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