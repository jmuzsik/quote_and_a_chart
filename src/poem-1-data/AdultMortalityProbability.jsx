import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, filterTable, mapTable, initialReformat, filterBySex } from '../utils.js';
import { WikiquoteApi, error } from '../WikiQuote.js'

const AdultMortalityProbabilityData = require('../data/adult-mortality-region.json')

class AdultMortalityProbability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      quote: ""
    };
    this.success = this.success.bind(this)
  }

  componentDidMount() {
    WikiquoteApi.getRandomQuote(this.props.title, this.success, error)
  }

  success(wikiData) {
    let quote = `"${wikiData.quote}"`, data = []
    data = mapTable(filterTable(initialReformat(AdultMortalityProbabilityData)))
    this.setState({ quote, data })
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
      dataFilter.forEach(row => {
        formatData[j] = {}
        formatData[j].region = row.region
        formatData[j].value = parseInt(row.value, 10)
        j++
      })
    }
    return (
      <div className='chart a-mortality'>
        <p>{this.state.quote}</p>
        <h6 className="title">Adult mortality rate (probability of dying between 15 and 60 years per 1000 population) - 2015
        </h6>
        <ResponsiveContainer width='100%' height={300}>
          <RadarChart
            cx="50%" cy="50%" outerRadius="80%"
            data={formatData}
          >
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="region" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
              name="Probability"
              dataKey="value"
              stroke="#4286f4"
              fill="#4e5d75"
              fillOpacity={0.7}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div >
    );
  }
}

export default AdultMortalityProbability;
