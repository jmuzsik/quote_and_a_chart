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
  initialReformat,
  filterBySex
} from '../utils.js'
import { WikiquoteApi, error } from '../WikiQuote.js'

const LifeExpectancyData = require('../data/life-expectancy.json')

class LifeExpectancy extends Component {
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
    WikiquoteApi.getRandomQuote('Life', success, error)
    data = mapTable(filterTable(initialReformat(LifeExpectancyData)))
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
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], another_year: [...], ...}, ...]
      data = filterAll(dataFunction(this.state.data))
      data = filterBySex(
        'Both sexes',
        data,
        'Life expectancy at birth (years)',
        2015
      )
      //for a bar the table must be used to compare data based upon a datakey for the x-axis, a specific dataKey for each country works
      finalData[i] = {}
      finalData[i].xaxis = ''
      //because I could not put each country as its own x-axis value I had to give them an individual one, so only one object is made with the country/value I want
      data.forEach(obj => {
        if (obj.country === 'Afghanistan') {
          finalData[i].Afghanistan = +obj.value
        }
        if (obj.country === 'Switzerland') {
          finalData[i].Switzerland = +obj.value
        }
        if (obj.country === 'Nigeria') {
          finalData[i].Nigeria = +obj.value
        }
        if (obj.country === 'Libya') {
          finalData[i].Libya = +obj.value
        }
        if (obj.country === 'Lesotho') {
          finalData[i].Lesotho = +obj.value
        }
        if (obj.country === 'Syrian Arab Republic') {
          finalData[i]['Syrian Arab Republic'] = +obj.value
        }
        if (obj.country === 'Viet Nam') {
          finalData[i]['Viet Nam'] = +obj.value
        }
        if (obj.country === 'Malawi') {
          finalData[i].Malawi = +obj.value
        }
        if (obj.country === 'France') {
          finalData[i].France = +obj.value
        }
        if (obj.country === 'Madagascar') {
          finalData[i].Madagascar = +obj.value
        }
        if (obj.country === 'United States of America') {
          finalData[i]['United States of America'] = +obj.value
        }
        if (obj.country === 'Uzbekistan') {
          finalData[i].Uzbekistan = +obj.value
        }
        if (obj.country === 'Saudi Arabia') {
          finalData[i]['Saudi Arabia'] = +obj.value
        }
      })
    }
    return (
      <div className="chart bar life-expectancy">
        <p>{this.state.quote}</p>
        <h6>
          Life expectancy at birth (years) 2015 Data set (Both sexes averaged)
        </h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart cx="50%" cy="50%" outerRadius="80%" data={finalData}>
            <XAxis dataKey="xaxis" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="Afghanistan" fill="black" />
            <Bar dataKey="Switzerland" fill="green" />
            <Bar dataKey="Nigeria" fill="purple" />
            <Bar dataKey="Libya" fill="orange" />
            <Bar dataKey="Lesotho" fill="brown" />
            <Bar dataKey="Syrian Arab Republic" fill="#C90016" />
            <Bar dataKey="Viet Nam" fill="red" />
            <Bar dataKey="Malawi" fill="pink" />
            <Bar dataKey="United States of America" fill="grey" />
            <Bar dataKey="France" fill="blue" />
            <Bar dataKey="Uzbekistan" fill="gold" />
            <Bar dataKey="Saudi Arabia" fill="maroon" />
            <Bar dataKey="Madagascar" fill="lime" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default LifeExpectancy
