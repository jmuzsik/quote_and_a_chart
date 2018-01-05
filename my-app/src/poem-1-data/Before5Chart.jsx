import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, separateDataByYears, averageDataByYear, filterTable, mapTable, initialReformat } from '../utils.js';
const BeforeFiveMortality = require('../data/health-child-mortality-births-region.json')

class MortalityBeforeFiveChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(BeforeFiveMortality)))
    this.setState({ data })
  }

  render() {
    let data = [],
      dataFilter = [],
      formatData = [],
      j = 0
    if (this.state.data.length > 0) {
      //separates data based upon year.. as so: [some_title: {some_year: [objs_of_data],...},...]
      data = filterAll(dataFunction(this.state.data));
      //averages data from all years based upon region, {region1: data1, ...}
      dataFilter = averageDataByYear(separateDataByYears(data, 'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'))
      //format data to be read by react bootstrap tables
      for (var key in dataFilter) {
        formatData[j] = {}
        formatData[j].region = key
        formatData[j].value = dataFilter[key]
        j++
      }
    }
    return (
      <div className="chart under-five">
        {/* <h6 className="title">Under-five mortality rate (probability of dying by age 5 per 1000 live births)
        </h6> */}
        <RadarChart
          width={300}
          height={300}
          data={formatData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="region" />
          <PolarRadiusAxis />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </div>
    );
  }
}

export default MortalityBeforeFiveChart;
