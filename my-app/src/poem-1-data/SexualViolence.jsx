import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import React, { Component } from 'react';
import { dataFunction, filterAll, mapTable, filterTable, initialReformat } from '../utils.js';
import { WikiquoteApi, error } from '../WikiQuote.js'

const SexViolenceData = require('../data/sexual-violence.json');

class SexualViolence extends Component {
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
    let quote = wikiData.quote, data = []
    data = mapTable(filterTable(initialReformat(SexViolenceData)))
    this.setState({ quote, data })
  }

  render() {
    let data = [],
      finalData = [],
      i = 0;
    if (this.state.data.length > 0) {
      //format data so that data can be utilised by year... [title: {year: [obj_with_data, ...], ...}, ...]
      data = filterAll(dataFunction(this.state.data));
      data = data['Proportion of young women and men aged 18-29 years who experienced sexual violence by age 18 (%)']
      //for a bar the table must be used to compare data based upon a datakey for the x-axis, a specific dataKey for each country works
      finalData[i] = {};
      finalData[i].xaxis = ''
      //because I could not put each country as its own x-axis value I had to give them an individual one, so only one object is made with the country/value I want
      for (var key in data) {
        //basically grab the last year that data was available for the country
        data[key].forEach(obj => {
          finalData[i][obj.country] = parseFloat(obj.value)
        });
      }
    }
    return (
      <div className="chart sexual-violence">
        <p>{this.state.quote}</p>

        <h5>Proportion of young women and men aged 18-29 years who experienced sexual violence by age 18 (%) - Most recent data</h5>
        <BarChart
          width={300}
          height={300}
          data={finalData}
        >
          <XAxis dataKey="xaxis" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="Cameroon"
            fill="black"
          />
          <Bar
            dataKey="Colombia"
            fill="green"
          />
          <Bar
            dataKey="Democratic Republic of the Congo"
            fill="purple"
          />
          <Bar
            dataKey="Gambia"
            fill="orange"
          />
          <Bar
            dataKey="Honduras"
            fill="brown"
          />
          <Bar
            dataKey="India"
            fill="#C90016"
          />
          <Bar
            dataKey="Mozambique"
            fill="red"
          />
          <Bar
            dataKey="Nepal"
            fill="pink"
          />
          <Bar
            dataKey="Philippines"
            fill="grey"
          />
          <Bar
            dataKey="Tajikistan"
            fill="blue"
          />
          <Bar
            dataKey="Rwanda"
            fill="gold"
          />
          <Bar
            dataKey="Ukraine"
            fill="maroon"
          />
          <Bar
            dataKey="Zimbabwe"
            fill="lime"
          />
        </BarChart>
      </div>
    );
  }
}

export default SexualViolence;
