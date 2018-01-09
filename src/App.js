import React, { Component } from 'react'
import './App.css'

//all the charts and data
import AdultMortalityProbability from './poem-1-data/AdultMortalityProbability'
import AlcoholDeaths from './poem-1-data/AlcoholDeaths'
import MortalityBeforeFiveChart from './poem-1-data/Before5Chart'
import HIVKnowledge from './poem-1-data/HIVKnowledge'
import IntimatePartnerViolence from './poem-1-data/IntimatePartnerViolence'
import LifeExpectancy from './poem-1-data/LifeExpectancy'
import OpenDefChart from './poem-1-data/OpenDefChart'
import PopulationBelowPovertyLine from './poem-1-data/PopulationBelowPovertyLine'
import SexualViolence from './poem-1-data/SexualViolence'
import SexWorkersSyphilis from './poem-1-data/SexWorkersSyphilis'

//the two buttons at bottom of every page
import Buttons from './Buttons'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
    this.onPageChange = this.onPageChange.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  //every time a button is pressed to go to next, previous page, this runs
  onPageChange(value) {
    const currentPage = this.state.currentPage + value
    this.setState({ currentPage })
  }

  //each page is a specific case, as in a numerical page that it is located
  renderPage(curPage) {
    switch (curPage) {
      case 0:
        return <AdultMortalityProbability />
      case 1:
        return <AlcoholDeaths />
      case 2:
        return <MortalityBeforeFiveChart />
      case 3:
        return <HIVKnowledge />
      case 4:
        return <IntimatePartnerViolence />
      case 5:
        return <LifeExpectancy />
      case 6:
        return <OpenDefChart />
      case 7:
        return <PopulationBelowPovertyLine />
      case 8:
        return <SexualViolence />
      case 9:
        return <SexWorkersSyphilis />
      default:
        return <HIVKnowledge />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderPage(this.state.currentPage)}
        <Buttons
          currentPage={this.state.currentPage}
          onPageChange={this.onPageChange}
        />
      </div>
    )
  }
}

export default App
