import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import React, { Component } from 'react'
import {
  dataFunction,
  filterAll,
  separateDataByYears,
  averageDataByYear,
  filterTable,
  mapTable,
  initialReformat
} from '../utils.js'
import { WikiquoteApi, error } from '../WikiQuote.js'

const BeforeFiveMortality = require('../data/health-child-mortality-births-region.json')

class MortalityBeforeFiveChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      quote: ''
    }
  }

  componentDidMount() {
    let quote = '',
      data = []
    const success = wikiData => {
      quote = `"${wikiData.quote}"`
    }
    WikiquoteApi.getRandomQuote('Childhood', success, error)
    data = mapTable(filterTable(initialReformat(BeforeFiveMortality)))
    const checkQuoteLength = () => {
      if (quote.length > 0) {
        this.setState({ quote, data })
      } else {
        setTimeout(checkQuoteLength, 100)
      }
    }
    checkQuoteLength()
  }

  render() {
    let data = [],
      dataFilter = [],
      formatData = [],
      j = 0
    if (this.state.data.length > 0) {
      //separates data based upon year.. as so: [some_title: {some_year: [objs_of_data],...},...]
      data = filterAll(dataFunction(this.state.data))
      //averages data from all years based upon region, {region1: data1, ...}
      dataFilter = averageDataByYear(
        separateDataByYears(
          data[
            'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'
          ]
        )
      )
      //format data to be read by recharts
      for (var key in dataFilter) {
        formatData[j] = {}
        formatData[j].region = key
        formatData[j].value = parseInt(dataFilter[key], 10)
        j++
      }
    }
    return (
      <div className="chart under-five">
        <p>{this.state.quote}</p>
        <h6 className="title">
          Under-five mortality rate (probability of dying by age 5 per 1000 live
          births)
        </h6>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formatData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="region" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
              name="probability"
              dataKey="value"
              stroke="#8884d8"
              fill="#160e68"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default MortalityBeforeFiveChart
