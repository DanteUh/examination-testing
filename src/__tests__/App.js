import React from 'react';
import { render, mount } from 'enzyme';
import App from '../components/App';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

test('renders the app', () => {
  render(<App />);
});

describe('Change page', () => {
  it('should change page', () => {
    const homePage = 'home';
    const botPage = 'bot';
    const wrapper = mount(<App />);
    wrapper.setState({ currentPage: botPage });
    wrapper.instance().changePage();
    expect(wrapper.state().currentPage).toBe(homePage);
  });
  it('simulate change page on click', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ currentPage: 'home' });
    expect(wrapper.find('button').text()).toEqual('Talk to a real human');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toEqual('Return to forum');
  });
});

describe('Change persona', () => {
  it('should fetch current persona', () => {
    const currentPersona = JSON.stringify('Esmeralda');
    const wrapper = mount(<App />);
    localStorage.setItem('currentPersona', currentPersona);
    wrapper.instance().fetchCurrentPersona();
    expect(wrapper.state().currentPersona).toBe('Esmeralda');
  });

  it.skip('simulating persona change', () => {
    const newPersona = 'Zac';
    const wrapper = mount(<App />);
    wrapper.setState({ currentPersona: 'Esmeralda' })
    expect(wrapper.state().currentPersona).toBe('Esmeralda');
    wrapper.instance().changePersona({ newPersona });
    expect(wrapper.state().currentPersona).toBe(newPersona);
  });
});
