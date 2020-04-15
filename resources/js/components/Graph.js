import React from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { BoxLoading } from 'react-loadingg';

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      chartDataConfirmed:{},
      chartDataDeaths:{}
    }
  }

  componentDidMount(){
    this.getJsonConfirmed();
    this.getJsonDeaths();
  }

  async getJsonDeaths(){
    const url = 'https://covid2019-api.herokuapp.com/v2/timeseries/deaths';
    const response = await fetch(url);
    const data = await response.json();
    var country = [];
    var singleCountries = [];
    for(var i = 0; i < data['data'].length-1; i++){
      if(data['data'][i]['Province/State'] == ""){
        singleCountries.splice(singleCountries.length, 0, data['data'][i]);
      }
    }
    for (var i = 0; i < data['data'].length; i++) {
      if((data['data'][i]['Country/Region'] == "France" || data['data'][i]['Country/Region'] == "Italy" ||
        data['data'][i]['Country/Region'] == "United Kingdom" || data['data'][i]['Country/Region'] == "Ireland" ||
        data['data'][i]['Country/Region'] == "Belgium" || data['data'][i]['Country/Region'] == "Spain" ||
        data['data'][i]['Country/Region'] == "Germany" || data['data'][i]['Country/Region'] == "Japan" ||
        data['data'][i]['Country/Region'] == "Korea, South" || data['data'][i]['Country/Region'] == "Iran")
        && data['data'][i]['Province/State'] == ""){
        country.splice(0, 0, data['data'][i]);
      }
    }

    this.setState({
      isLoaded:true,
      items: singleCountries,
    });

    var timeseriesCountryDeaths = [];
    for(var u=0; u<country.length-1; u++){
      var timeseriesValue = [];
      var timeseriesDate = [];
      for(var i=30; i<country[u]['TimeSeries'].length; i++){
        timeseriesValue.push(country[u]['TimeSeries'][i]['value']);
        timeseriesDate.push(country[u]['TimeSeries'][i]['date']);
      }
      timeseriesCountryDeaths.push(timeseriesValue);
    }

    this.setState({
      chartDataDeaths:{
        labels:timeseriesDate,
        datasets:[
          {
           borderColor: "rgba(255,0,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[0]['Country/Region'],
           data: timeseriesCountryDeaths[0]
          },
          {
           borderColor: "rgba(0,255,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[1]['Country/Region'],
           data: timeseriesCountryDeaths[1]
          },
          {
           borderColor: "rgba(0,0,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[2]['Country/Region'],
           data: timeseriesCountryDeaths[2]
          },
          {
           borderColor: "rgba(255,255,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[3]['Country/Region'],
           data: timeseriesCountryDeaths[3]
          },
          {
           borderColor: "rgba(255,0,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[4]['Country/Region'],
           data: timeseriesCountryDeaths[4]
          },
          {
           borderColor: "rgba(0,255,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[5]['Country/Region'],
           data: timeseriesCountryDeaths[5]
          },
          {
           borderColor: "rgba(255,0,85,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[6]['Country/Region'],
           data: timeseriesCountryDeaths[6]
          },
          {
           borderColor: "rgba(102,255,127,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[7]['Country/Region'],
           data: timeseriesCountryDeaths[7]
          },
          {
           borderColor: "rgba(0,0,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[8]['Country/Region'],
           data: timeseriesCountryDeaths[8]
          },
          {
           borderColor: "rgba(217,179,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[9]['Country/Region'],
           data: timeseriesCountryDeaths[9]
          },
        ],
      }
    });
  }

  async getJsonConfirmed(){
    const url = 'https://covid2019-api.herokuapp.com/v2/timeseries/confirmed';
    const response = await fetch(url);
    const data = await response.json();
    var country = [];
    var singleCountries = [];
    for(var i = 0; i < data['data'].length-1; i++){
      if(data['data'][i]['Province/State'] == ""){
        singleCountries.splice(singleCountries.length, 0, data['data'][i]);
      }
    }
    for (var i = 0; i < data['data'].length; i++) {
      if((data['data'][i]['Country/Region'] == "France" || data['data'][i]['Country/Region'] == "Ireland" ||
        data['data'][i]['Country/Region'] == "United Kingdom" || data['data'][i]['Country/Region'] == "US" ||
        data['data'][i]['Country/Region'] == "Belgium" || data['data'][i]['Country/Region'] == "Spain" ||
        data['data'][i]['Country/Region'] == "Germany" || data['data'][i]['Country/Region'] == "Japan" ||
        data['data'][i]['Country/Region'] == "Korea, South" || data['data'][i]['Country/Region'] == "Iran")
        && data['data'][i]['Province/State'] == ""){
        country.splice(0, 0, data['data'][i]);
      }
    }

    this.setState({
      isLoaded:true,
      items: singleCountries,
    });

    var timeseriesCountryConfirmed = [];
    for(var u=0; u<country.length; u++){
      var timeseriesValue = [];
      var timeseriesDate = [];
      for(var i=30; i<country[u]['TimeSeries'].length; i++){
        timeseriesValue.push(country[u]['TimeSeries'][i]['value']);
        timeseriesDate.push(country[u]['TimeSeries'][i]['date']);
      }
      timeseriesCountryConfirmed.push(timeseriesValue);
    }

    this.setState({
      chartDataConfirmed:{
        labels:timeseriesDate,
        datasets:[
          {
           borderColor: "rgba(255,0,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[0]['Country/Region'],
           data: timeseriesCountryConfirmed[0]
          },
          {
           borderColor: "rgba(0,255,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[1]['Country/Region'],
           data: timeseriesCountryConfirmed[1]
          },
          {
           borderColor: "rgba(0,0,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[2]['Country/Region'],
           data: timeseriesCountryConfirmed[2]
          },
          {
           borderColor: "rgba(255,255,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[3]['Country/Region'],
           data: timeseriesCountryConfirmed[3]
          },
          {
           borderColor: "rgba(255,0,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[4]['Country/Region'],
           data: timeseriesCountryConfirmed[4]
          },
          {
           borderColor: "rgba(0,255,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[5]['Country/Region'],
           data: timeseriesCountryConfirmed[5]
          },
          {
           borderColor: "rgba(255,0,85,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[6]['Country/Region'],
           data: timeseriesCountryConfirmed[6]
          },
          {
           borderColor: "rgba(102,255,127,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[7]['Country/Region'],
           data: timeseriesCountryConfirmed[7]
          },
          {
           borderColor: "rgba(0,0,0,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[8]['Country/Region'],
           data: timeseriesCountryConfirmed[8]
          },
          {
           borderColor: "rgba(217,179,255,0.5)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[9]['Country/Region'],
           data: timeseriesCountryConfirmed[9]
          },
        ],
      }
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if(!isLoaded){
      return <BoxLoading />
    }
    else{
      return (
        <div className="container">
          <div className="my_chart">
            <Line
              data={this.state.chartDataConfirmed}
              options={{
                title:{
                  display:true,
                  text:'Daily Statistics of Confirmed Covid19 Cases',
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'right',
                  labels:{
                    fontColor:'#000'
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Total Number of Confirmed Cases'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    }
                  }]
                }
              }}
            />
          </div>
          <br /><br /><br />
          <div className="my_chart">
            <Line
              data={this.state.chartDataDeaths}
              options={{
                title:{
                  display:true,
                  text:'Daily Statistics of Covid19 Deaths',
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'right',
                  labels:{
                    fontColor:'#000'
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Total Number of Deaths'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    }
                  }]
                }
              }}
            />
          </div>
        </div>
      );
    }
  }
}


export default Graph;

ReactDOM.render(<Graph />, document.getElementById('graph'));
