import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

import HIVKnowledge from './poem-1-data/HIVKnowledge'
import PopulationBelowPovertyLine from './poem-1-data/PopulationBelowPovertyLine'

it('renders without crashing', () => {
  shallow(<App />)
})

test('At first I should see Adult Mortality Page', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('AdultMortalityProbability').length).toBe(1)
})

test('There should be a Buttons component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Buttons').length).toBe(1)
})

test('If currentPage state is a different value it should render the specified component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.instance().renderPage(3).type).toBe(HIVKnowledge)
  expect(wrapper.instance().renderPage(7).type).toBe(PopulationBelowPovertyLine)
  //default value
  expect(wrapper.instance().renderPage(4234234).type).toBe(HIVKnowledge)
})

test('When onPageChange occurs it should alter the state', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().onPageChange(1)
  expect(wrapper.state().currentPage).toBe(1)
  wrapper.instance().onPageChange(-1)
  expect(wrapper.state().currentPage).toBe(0)
})
