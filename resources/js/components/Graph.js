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
      if(data['data'][i]['Country/Region'] == "France" && data['data'][i]['Province/State'] == ""){
        country.splice(0, 0, data['data'][i]);
      }

    }

    this.setState({
      isLoaded:true,
      items: singleCountries,
    });

    var timeseriesValue = [];
    var timeseriesDate= [];
    for(var i=country[0]['TimeSeries'].length-1; i>=0; i--){
      timeseriesValue.splice(0, 0, country[0]['TimeSeries'][i]['value']);
      timeseriesDate.splice(0, 0, country[0]['TimeSeries'][i]['date']);
    }
    //console.log(country);
    this.setState({
      chartData:{
        labels:timeseriesDate,
        datasets:[
          {fillColor: "rgba(220,220,220,0.2)",
           borderColor: "rgba(220,220,220,1)",
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
      console.log(items);
      return (
        <div className="container">
        <ol>
          {items.map(item => (
            <li key={item}>
              {item['Country/Region']}
            </li>
          ))}
        </ol>
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
