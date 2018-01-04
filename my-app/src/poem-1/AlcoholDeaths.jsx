import React, { Component } from 'react';
import { dataFunction, filterAll, filterBySex, turnStringsIntoFloats, mapTable, filterTable, initialReformat } from '../utils.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const AlcoholConumptionDeaths = require('../data/alcohol-consumption-related-deaths.json');

class AlcoholDeaths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let data = []
    data = mapTable(filterTable(initialReformat(AlcoholConumptionDeaths)))
    this.setState({ data })
  }

  render() {
    let data = [],
      options = {};
    if (this.state.data.length > 0) {
      data = filterAll(dataFunction(this.state.data, 'alcohol'));
      data = filterBySex('Both sexes', data, 'Alcohol-attributable fractions, all-cause deaths (%)', '2012')
      data = turnStringsIntoFloats(data, 'value')
      var selectRowProp = {
        bgColor: 'rgb(238, 193, 213)'
      };
    }
    return (
      this.state.data.length > 0 && (
        <BootstrapTable
          selectRow={selectRowProp}
          striped
          condensed
          search
          multiColumnSearch
          pagination
          tableStyle={ {width:'80%', position:'relative', left: '10vw'} }
          data={data}
        >
          <TableHeaderColumn row="0" colSpan="4" dataAlign="center">
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

      )
    );
  }
}

export default AlcoholDeaths;
