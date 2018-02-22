import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
import Buttons from './Buttons'

test('State should be disabled for left button when nextProps is 0, disabled for right button when nextProps is 9', () => {
  const wrapper = shallow(<Buttons />)
  //default check
  expect(wrapper.state().leftButtonDisable).toBe(true)
  expect(wrapper.state().rightButtonDisable).toBe(false)
  //in between 0 and 9
  wrapper.setProps({ currentPage: 5 })
  expect(wrapper.state().leftButtonDisable).toBe(false)
  expect(wrapper.state().rightButtonDisable).toBe(false)
  //at 9
  wrapper.setProps({ currentPage: 9 })
  expect(wrapper.state().leftButtonDisable).toBe(false)
  expect(wrapper.state().rightButtonDisable).toBe(true)
  //in between 0 and 9 again
  wrapper.setProps({ currentPage: 3 })
  expect(wrapper.state().leftButtonDisable).toBe(false)
  expect(wrapper.state().rightButtonDisable).toBe(false)
  //at 0
  wrapper.setProps({ currentPage: 0 })
  expect(wrapper.state().leftButtonDisable).toBe(true)
  expect(wrapper.state().rightButtonDisable).toBe(false)
})

test('On click should pass value to the parent class method', () => {
  const wrapper = mount(<App />)
  const childWrapper = wrapper.find('Buttons')
  //if left is clicked, should not work as it is disabled
  childWrapper.find({value:'left'}).simulate('click')
  expect(wrapper.state().currentPage).toBe(0)
  //if right is clicked, should increment currentPage state in App
  childWrapper.find({value:'right'}).simulate('click')
  expect(wrapper.state().currentPage).toBe(1)
  //decrement when not disabled
  childWrapper.find({value:'left'}).simulate('click')
  expect(wrapper.state().currentPage).toBe(0)
})
