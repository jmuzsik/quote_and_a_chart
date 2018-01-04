import React, { Component } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { dataFunction, filterAll, filterBySex, turnStringsIntoFloats } from '../utils.js';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class AlcoholDeaths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(state, instance) {
    axios
      .get(this.props.url)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.error(err));
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
