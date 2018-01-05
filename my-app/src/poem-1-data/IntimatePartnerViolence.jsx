import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, filterTable, mapTable, initialReformat, filterByAgeGroup } from '../utils.js';
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
      formatData = []
    if (this.state.data.length > 0) {
      //separates data based upon year.. as so: [some_title: {some_year: [objs_of_data],...},...]
      data = filterAll(dataFunction(this.state.data));
      data = data['Intimate partner violence prevalence among ever partnered women (%)'][2010];
      formatData = filterByAgeGroup(data, '15-69  (total) years')
      formatData.map(row => {
        row.value = parseFloat(row.value)
      })
      //averages data from all years based upon region, {region1: data1, ...}
      //format data to be read by react bootstrap tables
    }
    return (
      <div className="chart partner-violence">
        {/* <h6 className="title">
          Intimate partner violence prevalence among ever partnered women (%) - 15-69  (total) years averaged
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
