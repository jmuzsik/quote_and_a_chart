import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, filterTable, mapTable, initialReformat, filterBySex } from '../utils.js';
const AdultMortalityProbabilityData = require('../data/adult-mortality-region.json')

class AdultMortalityProbability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(AdultMortalityProbabilityData)))
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
      dataFilter = filterBySex('Both sexes', data, 'Adult mortality rate (probability of dying between 15 and 60 years per 1000 population)', 2015)
      //format data to be read by recharts)
      console.log(dataFilter)
      dataFilter.forEach(row => {
        formatData[j] = {}
        formatData[j].region = row.region
        formatData[j].value = parseInt(row.value, 10)
        j++
      })
    }
    return (
      <div className='chart a-mortality'>
        {/* <h6 className="title">Adult mortality rate (probability of dying between 15 and 60 years per 1000 population) - 2015
        </h6> */}
        <RadarChart
          width={300}
          height={300}
          data={formatData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="region" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#910000"
            fillOpacity={0.7}
          />
        </RadarChart>
      </div>
    );
  }
}

export default AdultMortalityProbability;
