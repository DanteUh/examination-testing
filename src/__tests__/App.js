import React from 'react';
import { render, mount } from 'enzyme';
import App from '../components/App';

test('renders the app', () => {
  render(<App />);
});

describe('change page', () => {
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
