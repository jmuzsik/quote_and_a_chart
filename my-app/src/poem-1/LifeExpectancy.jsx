import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat, filterBySex } from '../utils.js';
const LifeExpectancyData = require('../data/life-expectancy.json');

class LifeExpectancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(LifeExpectancyData)))
    this.setState({ data })
  }

  render() {
    let data = [],
      finalData = [],
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
      data = filterBySex('Both sexes', data, 'Life expectancy at birth (years)', 2015)
      //for a bar the table must be used to compare data based upon a datakey for the x-axis, a specific dataKey for each country works
      finalData[i] = {};
      finalData[i].xaxis = ''
      //because I could not put each country as its own x-axis value I had to give them an individual one, so only one object is made with the country/value I want
      data.forEach(obj => {
        if (obj.country === "Afghanistan") {
          finalData[i].Afghanistan = +obj.value;
        }
        if (obj.country === "Switzerland") {
          finalData[i].Switzerland = +obj.value;
        }
        if (obj.country === "Nigeria") {
          finalData[i].Nigeria = +obj.value;
        }
        if (obj.country === "Libya") {
          finalData[i].Libya = +obj.value;
        }
        if (obj.country === "Lesotho") {
          finalData[i].Lesotho = +obj.value;
        }
        if (obj.country === "Syrian Arab Republic") {
          finalData[i]['Syrian Arab Republic'] = +obj.value;
        }
        if (obj.country === "Viet Nam") {
          finalData[i]['Viet Nam'] = +obj.value;
        }
        if (obj.country === "Malawi") {
          finalData[i].Malawi = +obj.value;
        }
        if (obj.country === "France") {
          finalData[i].France = +obj.value;
        }
        if (obj.country === "Madagascar") {
          finalData[i].Madagascar = +obj.value;
        }
        if (obj.country === "United States of America") {
          finalData[i]['United States of America'] = +obj.value;
        }
        if (obj.country === "Uzbekistan") {
          finalData[i].Uzbekistan = +obj.value;
        }
        if (obj.country === "Saudi Arabia") {
          finalData[i]['Saudi Arabia'] = +obj.value;
        }
      });
    }
    return (
      <div>
        <h5>Life expectancy at birth (years) 2015 Data set (Both sexes averaged)</h5>
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
            dataKey="Afghanistan"
            fill="black"
          />
          <Bar
            dataKey="Switzerland"
            fill="green"
          />
          <Bar
            dataKey="Nigeria"
            fill="purple"
          />
          <Bar
            dataKey="Libya"
            fill="orange"
          />
          <Bar
            dataKey="Lesotho"
            fill="brown"
          />
          <Bar
            dataKey="Syrian Arab Republic"
            fill="#C90016"
          />
          <Bar
            dataKey="Viet Nam"
            fill="red"
          />
          <Bar
            dataKey="Malawi"
            fill="pink"
          />
          <Bar
            dataKey="United States of America"
            fill="grey"
          />
          <Bar
            dataKey="France"
            fill="blue"
          />
          <Bar
            dataKey="Uzbekistan"
            fill="gold"
          />
          <Bar
            dataKey="Saudi Arabia"
            fill="maroon"
          />
          <Bar
            dataKey="Madagascar"
            fill="lime"
          />
        </BarChart>
      </div>
    );
  }
}

export default LifeExpectancy;
