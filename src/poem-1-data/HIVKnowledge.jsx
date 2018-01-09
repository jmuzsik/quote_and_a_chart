import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat } from '../utils.js';
import { WikiquoteApi, error } from '../WikiQuote.js'

const HIVKnowledgeData = require('../data/diseases-hiv-knowledge.json');

class HIVKnowledge extends Component {
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
    const checkQuoteLength = () => {
      if (quote.length > 0) {
        this.setState({ quote, data })
      } else {
        setTimeout(checkQuoteLength, 100)
      }
    }
    WikiquoteApi.getRandomQuote("HIV/AIDS", success, error)
    data = mapTable(filterTable(initialReformat(HIVKnowledgeData)))
    checkQuoteLength()
  }

  render() {
    let data = [],
      finalData = [],
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
      //what exact countries do I want to show data for?
      data =
        data[
        'Knowlege about sexual transmission of AIDS'
        ];
      //set each country as a 'dataKey' with value what is shown on the chart.
      for (var year in data) {
        finalData.push({ year });
        data[year].forEach(obj => {
          //do this in case there is a male and female to average the data between gender
          if (parseFloat(finalData[i][obj.country]) > 0) {
            finalData[i][obj.country] = (finalData[i][obj.country] + +obj.value) / 2
          }
          //otherwise set to value if only male or female, or first instance of either
          else finalData[i][obj.country] = +obj.value;
        });
        i++;
      }
    }
    return (
      <div className="chart bar HIV">
        <p>{this.state.quote}</p>
        <h6>Knowlege about sexual transmission of AIDS (Average Both Sexes)</h6>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            cx="50%" cy="50%" outerRadius="80%"
            data={finalData}
          >
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line connectNulls={true} type="monotone" dataKey="Zambia" stroke="black" />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Bangladesh"
              stroke="green"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Bolivia (Plurinational State of)"
              stroke="purple"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Cameroon"
              stroke="orange"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Ghana"
              stroke="brown"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Malawi"
              stroke="#C90016"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Nepal"
              stroke="red"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Zimbabwe"
              stroke="maroon"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="United Republic of Tanzania"
              stroke="grey"
            />
            <Line
              connectNulls={true}
              type="monotone"
              dataKey="Peru"
              stroke="#6082B6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default HIVKnowledge
