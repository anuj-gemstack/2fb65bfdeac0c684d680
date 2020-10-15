import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as CONSTANTS from "./constants";

class WeatherReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInformation: {
        latlng: [],
      },
      currentWeather: {},
    };
  }

  componentDidMount() {
    console.log(this.props.history.location.state.countryInformation);
    this.setState({
      countryInformation: this.props.history.location.state.countryInformation,
    });
  }

  getWeatherDetail = () => {
    let url = `http://api.weatherstack.com/current?access_key=${CONSTANTS.API_KEY}&query=${this.state.countryInformation.capital}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.current) {
          this.setState({
            currentWeather: json.current,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showWeatherDetail = () => {
    if (this.state.currentWeather.hasOwnProperty("temperature")) {
      return (
        <div style={{ flexDirection: "row" }}>
          <h3>temperature: {this.state.currentWeather.temperature}</h3>
          {this.state.currentWeather.weather_icons.map((img) => {
            return <img src={img} />;
          })}
          <h3>wind speed: {this.state.currentWeather.wind_speed}</h3>
          <h3>precip: {this.state.currentWeather.precip}</h3>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div style={{ flexDirection: "row" }}>
          <h3>capital: {this.state.countryInformation.capital}</h3>
          <h3>population: {this.state.countryInformation.population}</h3>
          {this.state.countryInformation.latlng.map((item, index) => {
            return index == 0 ? (
              <h3 key={item}>latitude: {item}</h3>
            ) : (
              <h3 key={item}>longitude: {item}</h3>
            );
          })}
          <img
            src={this.state.countryInformation.flag}
            style={{ height: 400, width: 600 }}
          />
        </div>

        <div style={{ flexDirection: "row", marginTop: 50 }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.getWeatherDetail();
                // console.log(this.state.countryName);
              }}
            >
              Capital Weather
            </Button>

            {this.showWeatherDetail()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(WeatherReport);
