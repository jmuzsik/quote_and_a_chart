import React, { Component } from 'react';
import './App.css';
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <AdultMortalityProbability />
        <AlcoholDeaths />
        <MortalityBeforeFiveChart />
        <HIVKnowledge />
        <IntimatePartnerViolence />
        <LifeExpectancy />
        <OpenDefChart />
        <PopulationBelowPovertyLine />
        <SexualViolence />
        <SexWorkersSyphilis />
      </div>
    );
  }
}

export default App;
