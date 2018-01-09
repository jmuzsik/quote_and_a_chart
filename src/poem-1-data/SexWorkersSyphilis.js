import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import React, { Component } from 'react'
import {
  dataFunction,
  filterAll,
  mapTable,
  filterTable,
  initialReformat
} from '../utils.js'
import { WikiquoteApi, error } from '../WikiQuote.js'

const SexWorkersSyphilisData = require('../data/diseases-syphilis-sex-workers-with.json')

class SexWorkersSyphilis extends Component {
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
    WikiquoteApi.getRandomQuote('Disease', success, error)
    data = mapTable(filterTable(initialReformat(SexWorkersSyphilisData)))
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
      finalData = [],
      i = 0
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data))
      data = data['Sex workers with active syphilis (%)']
      //for a bar the table must be used to compare data based upon a datakey for the x-axis, a specific dataKey for each country works
      finalData[i] = {}
      finalData[i].xaxis = ''
      //because I could not put each country as its own x-axis value I had to give them an individual one, so only one object is made with the country/value I want
      //basically grab the last year that data was available for the country
      for (var key in data) {
        data[key].forEach(obj => {
          if (key > 2011) {
            finalData[i][obj.country] = parseFloat(obj.value)
          }
        })
      }
    }
    return (
      <div className="chart bar syphilis">
        <p>{this.state.quote}</p>

        <h6>Sex workers with active syphilis (%) - Most Recent Year Data</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart cx="50%" cy="50%" outerRadius="80%" data={finalData}>
            <XAxis dataKey="xaxis" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="Brazil" fill="black" />
            <Bar dataKey="Paraguay" fill="green" />
            <Bar dataKey="Chile" fill="purple" />
            <Bar dataKey="China" fill="orange" />
            <Bar dataKey="Bulgaria" fill="brown" />
            <Bar dataKey="Dominican Republic" fill="#C90016" />
            <Bar dataKey="Indonesia" fill="red" />
            <Bar dataKey="Myanmar" fill="pink" />
            <Bar dataKey="Zimbabwe" fill="grey" />
            <Bar dataKey="Senegal" fill="blue" />
            <Bar dataKey="Algeria" fill="gold" />
            <Bar dataKey="Mongolia" fill="maroon" />
            <Bar dataKey="Ghana" fill="lime" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default SexWorkersSyphilis
