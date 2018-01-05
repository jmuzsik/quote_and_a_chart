import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat } from '../utils.js';
const SexWorkersSyphilisData = require('../data/diseases-syphilis-sex-workers-with.json');

class SexWorkersSyphilis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(SexWorkersSyphilisData)))
    this.setState({ data })
  }

  render() {
    let data = [],
      finalData = [],
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
      data = data['Sex workers with active syphilis (%)']
      //for a bar the table must be used to compare data based upon a datakey for the x-axis, a specific dataKey for each country works
      finalData[i] = {};
      finalData[i].xaxis = ''
      //because I could not put each country as its own x-axis value I had to give them an individual one, so only one object is made with the country/value I want
      //basically grab the last year that data was available for the country
      for(var key in data) {
        data[key].forEach(obj => {
          if(key > 2011) {
            finalData[i][obj.country] = parseFloat(obj.value)
          }
        });
      }

      console.log(finalData)
    }
    return (
      <div>
        <h5>Proportion of young women and men aged 18-29 years who experienced sexual violence by age 18 (%) - Most recent data (about 2013)</h5>
        <BarChart
          width={1000}
          height={300}
          data={finalData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="xaxis" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="Brazil"
            fill="black"
          />
          <Bar
            dataKey="Paraguay"
            fill="green"
          />
          <Bar
            dataKey="Chile"
            fill="purple"
          />
          <Bar
            dataKey="China"
            fill="orange"
          />
          <Bar
            dataKey="Bulgaria"
            fill="brown"
          />
          <Bar
            dataKey="Dominican Republic"
            fill="#C90016"
          />
          <Bar
            dataKey="Indonesia"
            fill="red"
          />
          <Bar
            dataKey="Myanmar"
            fill="pink"
          />
          <Bar
            dataKey="Zimbabwe"
            fill="grey"
          />
          <Bar
            dataKey="Senegal"
            fill="blue"
          />
          <Bar
            dataKey="Algeria"
            fill="gold"
          />
          <Bar
            dataKey="Mongolia"
            fill="maroon"
          />
          <Bar
            dataKey="Ghana"
            fill="lime"
          />
        </BarChart>
      </div>
    );
  }
}

export default SexWorkersSyphilis;
