import React, { Component } from 'react';
import './App.css';

//all the charts and data
import AdultMortalityProbability from './poem-1-data/AdultMortalityProbability';
import AlcoholDeaths from './poem-1-data/AlcoholDeaths';
import MortalityBeforeFiveChart from './poem-1-data/Before5Chart';
import HIVKnowledge from './poem-1-data/HIVKnowledge';
import IntimatePartnerViolence from './poem-1-data/IntimatePartnerViolence';
import LifeExpectancy from './poem-1-data/LifeExpectancy';
import OpenDefChart from './poem-1-data/OpenDefChart';
import PopulationBelowPovertyLine from './poem-1-data/PopulationBelowPovertyLine';
import SexualViolence from './poem-1-data/SexualViolence';
import SexWorkersSyphilis from './poem-1-data/SexWorkersSyphilis';

//the two buttons at bottom of every page
import Buttons from './Buttons';

//this is what is searched in wikiquote for each corresponding page, chosen to the best of my ability, aiming to express the data with words, sometimes the choice is not ideal, but I grew tired of looking
const arrayOfTitles = ["Mortality", "Drunkenness", "Childhood", "HIV/AIDS", "Violence", "Life", "Suffering", "Poverty", "Pedophilia", "Disease"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      currentPage: 0
    };
    this.onPageChange = this.onPageChange.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  componentDidMount() {
    const title = arrayOfTitles[this.state.currentPage]
    this.setState({ title })
  }

  //every time a button is pressed to go to next, previous page, this runs
  onPageChange(value) {
    const currentPage = this.state.currentPage + value
    this.changeTitle(currentPage)
    this.setState({ currentPage })
  }

  //every time a page changes, the title to search for in wikiquote changes
  changeTitle(curPage) {
    const title = arrayOfTitles[curPage]
    this.setState({ title })
  }

  //each page is a specific case, as in a numerical page that it is located
  renderPage(curPage) {
    switch (curPage) {
      case 0:
        return <AdultMortalityProbability title={this.state.title} />
      case 1:
        return <AlcoholDeaths title={this.state.title} />
      case 2:
        return <MortalityBeforeFiveChart title={this.state.title} />
      case 3:
        return <HIVKnowledge title={this.state.title} />
      case 4:
        return <IntimatePartnerViolence title={this.state.title} />
      case 5:
        return <LifeExpectancy title={this.state.title} />
      case 6:
        return <OpenDefChart title={this.state.title} />
      case 7:
        return <PopulationBelowPovertyLine title={this.state.title} />
      case 8:
        return <SexualViolence title={this.state.title} />
      case 9:
        return <SexWorkersSyphilis title={this.state.title} />
      default:
        return <HIVKnowledge title={this.state.title} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.title.length && this.renderPage(this.state.currentPage)}
        {this.state.title.length && <Buttons currentPage={this.state.currentPage} onPageChange={this.onPageChange} />}
      </div>
    );
  }
}

export default App;
