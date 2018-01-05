import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, separateDataByYears, averageDataByYear, filterTable, mapTable, initialReformat, filterByAgeGroup } from '../utils.js';
const PartnerViolenceData = require('../data/health-women-violence-relationships.json')

class IntimatePartnerViolence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(PartnerViolenceData)))
    this.setState({ data })
  }

  render() {
    let data = [],
      formatData = [],
      j = 0
    if (this.state.data.length > 0) {
      //separates data based upon year.. as so: [some_title: {some_year: [objs_of_data],...},...]
      data = filterAll(dataFunction(this.state.data));
      data = data['Intimate partner violence prevalence among ever partnered women (%)'][2010];
      formatData = filterByAgeGroup(data, '15-69  (total) years')
      formatData.map( row => {
        row.value = parseFloat(row.value)
      })
      console.log(data)
      //averages data from all years based upon region, {region1: data1, ...}
      //format data to be read by react bootstrap tables
    }
    return (
      <div>
        <h6 className="title">
          Intimate partner violence prevalence among ever partnered women (%) - 15-69  (total) years averaged
        </h6>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={1000}
          height={500}
          margin={{left: 20}}
          data={formatData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="region" />
          <PolarRadiusAxis />
          <Radar
            name="Africa"
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

export default IntimatePartnerViolence;
