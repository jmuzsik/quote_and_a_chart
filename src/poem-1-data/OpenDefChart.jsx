import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat } from '../utils.js';
import { WikiquoteApi, error } from '../WikiQuote.js'

const OpenDefData = require('../data/open-defecation.json');

class OpenDefChart extends Component {
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
    WikiquoteApi.getRandomQuote("Suffering", success, error)
    data = mapTable(filterTable(initialReformat(OpenDefData)))
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
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
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
      <div className="chart bar open-def">
        <p>{this.state.quote}</p>
        <h6 className='title'>{this.state.data.length > 0 && data['1990'][0].title}</h6>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            cx="50%" cy="50%" outerRadius="80%"
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
        </ResponsiveContainer>
      </div>
    );
  }
}

export default OpenDefChart;
