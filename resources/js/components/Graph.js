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

  async componentDidMount(){
    this.getChartData();
    this.getJson();
    fetch('https://covid2019-api.herokuapp.com/v2/timeseries/confirmed')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded:true,
          items: json,
        })
      });
  }

  async getJson(){
    const url = 'https://covid2019-api.herokuapp.com/v2/timeseries/confirmed';
    const response = await fetch(url);
    const data = await response.json();
    var i;
    var country = [];
    for (i = 0; i < data['data'].length-1; i++) {
      if(data['data'][i]['Country/Region'] == "France" && data['data'][i]['Province/State'] == ""){
        country.splice(0, 0, data['data'][i]);
      }

    }
    console.log(country);
  }

  getChartData(){
    this.setState({
      chartData:{
        labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {fillColor: "rgba(220,220,220,0.2)",
           borderColor: "rgba(220,220,220,1)",
           backgroundColor: "rgba(0,0,0,0)",
           lineTension: 0,
           data: [65, 59, 80, 81, 56, 55, 40]
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
          <div>
          <ul>
            {items['data'].map(item => (
              <li key={item}>

                {item['Country/Region']} | {item['Coordinates']['Lat']}
              </li>
            ))}
          </ul>
          </div>
          <div className="my_chart">
            <Line
              data={this.state.chartData}
              options={{
                title:{
                  display:true,
                  text:'Largest Cities In Massachusetts',
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
