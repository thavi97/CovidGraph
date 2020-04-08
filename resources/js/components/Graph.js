import React from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      chartData:{}
    }
  }

  componentDidMount(){
    this.getJson();
  }

  async getJson(){
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
    for (var i = 0; i < data['data'].length-1; i++) {
      if((data['data'][i]['Country/Region'] == "France" || data['data'][i]['Country/Region'] == "Italy" ||
        data['data'][i]['Country/Region'] == "United Kingdom" || data['data'][i]['Country/Region'] == "US" ||
        data['data'][i]['Country/Region'] == "Thailand" || data['data'][i]['Country/Region'] == "Spain" ||
        data['data'][i]['Country/Region'] == "Germany" || data['data'][i]['Country/Region'] == "Japan" ||
        data['data'][i]['Country/Region'] == "Korea, South" || data['data'][i]['Country/Region'] == "Iran")
        && data['data'][i]['Province/State'] == ""){
        country.splice(0, 0, data['data'][i]);
      }
    }

    console.log(country);

    this.setState({
      isLoaded:true,
      items: singleCountries,
    });
    var timeseriesValue = [];
    var timeseriesDate= [];
    for(var i=0; i<country[0]['TimeSeries'].length-1; i++){
      timeseriesValue.splice(singleCountries.length, 0, country[0]['TimeSeries'][i]['value']);
      timeseriesDate.splice(singleCountries.length, 0, country[0]['TimeSeries'][i]['date']);
    }

    this.setState({
      chartData:{
        labels:timeseriesDate,
        datasets:[
          {fillColor: "rgba(255,0,0,0.2)",
           borderColor: "rgba(255,0,0,1)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: country[0]['Country/Region'],
           data: timeseriesValue
          },
          {fillColor: "rgba(151,187,205,0.2)",
           borderColor: "rgba(151,187,205,1)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           label: 'Bob2',
           data: [28, 48, 40, 19, 86, 27, 90]
          }
        ],

      }
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if(!isLoaded){
      return <div>Loading...</div>
    }
    else{
      return (
        <div className="container">
          <form>
            <select id="countries">
              {items.map(item => (
                <option key={item} value="{item['Country/Region']}">
                  {item['Country/Region']}
                </option>
              ))}
            </select>
          </form>
          <div className="my_chart">
            <Line
              data={this.state.chartData}
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
