import React, { Component } from 'react';
import { dataFunction, filterAll, filterBySex, turnStringsIntoFloats, mapTable, filterTable, initialReformat } from '../utils.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { WikiquoteApi, error } from '../WikiQuote.js'

const AlcoholConumptionDeaths = require('../data/alcohol-consumption-related-deaths.json');

class AlcoholDeaths extends Component {
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
    WikiquoteApi.getRandomQuote("Drunkenness", success, error)
    data = mapTable(filterTable(initialReformat(AlcoholConumptionDeaths)))
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
        finalData = []
      if (this.state.data.length > 0) {
        data = filterAll(dataFunction(this.state.data, 'alcohol'));
        data = filterBySex('Both sexes', data, 'Alcohol-attributable fractions, all-cause deaths (%)', '2012')
        finalData = turnStringsIntoFloats(data, 'value')
        var selectRowProp = {
          bgColor: 'rgb(238, 193, 213)'
        };
      }
      return (
        <div className="chart alcohol">
          <p>{this.state.quote}</p>
          <BootstrapTable
            selectRow={selectRowProp}
            striped
            condensed
            search
            multiColumnSearch
            pagination
            height="30vh"
            data={finalData}
          >
            <TableHeaderColumn row="0" colSpan="2" dataAlign="center">
              Alcohol-attributable fractions, all-cause deaths (%) Both Sexes 2012
          </TableHeaderColumn>
            <TableHeaderColumn
              row="1"
              dataField="country"
              isKey={true}
              width='30%'
            >
              Country
          </TableHeaderColumn>
            <TableHeaderColumn
              row="1"
              dataAlign="center"
              dataField="value"
              dataSort={true}
              width='20%'
            >
              Value
          </TableHeaderColumn>
          </BootstrapTable>
        </div>
      )
    }
  }

  export default AlcoholDeaths;
