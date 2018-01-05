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
const OpenDefData = require('../data/open-defecation.json');

class OpenDefChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(OpenDefData)))
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
      data =
        data[
        'Population not using any sanitation facility (open defecation) (%)'
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
      <div className="chart open-def">
        {/* <h5 className='title'>{this.state.data.length > 0 && data['1990'][0].title}</h5> */}
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
            dataKey="Colombia"
            stroke="black"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Zimbabwe"
            stroke="green"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Zambia"
            stroke="purple"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Viet Nam"
            stroke="orange"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="United Republic of Tanzania"
            stroke="black"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Uganda"
            stroke="brown"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Togo"
            stroke="#C90016"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Sierra Leone"
            stroke="red"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Senegal"
            stroke="maroon"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Philippines"
            stroke="grey"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Peru"
            stroke="#6082B6"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Nepal"
            stroke="#D4AF37"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Ghana"
            stroke="#00FF00"
          />
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="Cameroon"
            stroke="#5218FA"
          />
        </LineChart>
      </div>
    );
  }
}

export default OpenDefChart;
