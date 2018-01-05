import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat } from '../utils.js';
const PopulationBelowPovLineData = require('../data/population-below-poverty-line.json');

class PopulationBelowPovertyLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(PopulationBelowPovLineData)))
    this.setState({ data })
  }

  render() {
    let data = [],
      finalData = [],
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
      console.log(data)
      //Côte d'Ivoire
      data = data[
        'Proportion of population below the international poverty line of US$1.90 per day (%)'
      ];
      for (var key in data) {
        finalData.push({ year: key });
        data[key].forEach(obj => {
          finalData[i][obj.country] = +obj.value;
        });
        i++;
      }
    }

    return (
      <div className="chart below-poverty-line">
        {/* <h5>Proportion of population below the international poverty line of US$1.90 per day (%)</h5> */}
        <LineChart
          width={300}
          height={300}
          data={finalData}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Guinea"
            stroke="black" />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Ecuador"
            stroke="green"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Russian Federation"
            stroke="purple"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Côte d'Ivoire"
            stroke="orange"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Venezuela"
            stroke="black"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Zambia"
            stroke="brown"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Armenia"
            stroke="#C90016"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="China"
            stroke="red"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Bangladesh"
            stroke="maroon"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Brazil"
            stroke="grey"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Bulgaria"
            stroke="#6082B6"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Columbia"
            stroke="#D4AF37"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Nigeria"
            stroke="#00FF00"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Panama"
            stroke="#5218FA"
          />
        </LineChart>
      </div>
    );
  }
}

export default PopulationBelowPovertyLine;
