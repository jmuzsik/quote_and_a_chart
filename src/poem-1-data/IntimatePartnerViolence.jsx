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
import { dataFunction, filterAll, filterTable, mapTable, initialReformat, filterByAgeGroup } from '../utils.js';
import { WikiquoteApi, error } from '../WikiQuote.js'

const PartnerViolenceData = require('../data/health-women-violence-relationships.json')

class IntimatePartnerViolence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      quote: ""
    };
  }

  componentDidMount() {
    let quote = "", data = []
    const success = (wikiData) => {
      quote = `"${wikiData.quote}"`
    }
    WikiquoteApi.getRandomQuote("Violence", success, error)
    data = mapTable(filterTable(initialReformat(PartnerViolenceData)))
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
          <p>{this.state.quote}</p>
          <h6 className="title">
            Intimate partner violence prevalence among ever partnered women (%) - 15-69  (total) years averaged
        </h6>
          <ResponsiveContainer width='100%' height={300}>
            <RadarChart
              cx="50%" cy="50%" outerRadius="80%"
              data={formatData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="region" />
              <PolarRadiusAxis />
              <Tooltip />
              <Radar
                name="Percent"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }
  }

  export default IntimatePartnerViolence;
