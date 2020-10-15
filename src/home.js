import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: "",
      data: {},
      isError: false,
    };
  }

  onChange = (e) => {
    this.setState({ countryName: e.target.value });
  };

  getData = () => {
    fetch(
      "https://restcountries.eu/rest/v2/name/" + this.state.countryName.trim()
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 404) {
          this.setState({
            isError: true,
          });
        }
        if (json && json.length && json.length != 0) {
          this.props.history.push("/weather", {
            countryInformation: json[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div style={{ flexDirection: "row" }}>
          <TextField
            id="time"
            type="text"
            value={this.state.countryName}
            onChange={this.onChange}
            placeholder="Enter country"
          />

          <h4 style={{ color: "red" }}>
            {this.state.isError && "Please enter correct country name"}
          </h4>
        </div>

        <Button
          variant="contained"
          color="primary"
          disabled={this.state.countryName.trim() == ""}
          onClick={() => {
            this.getData();
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default withRouter(Home);
