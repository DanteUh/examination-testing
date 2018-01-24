import React from 'react';
import { render, mount } from 'enzyme';
import zac from '../images/zac.png';
import morgana from '../images/morgana.png';
import esmeralda from '../images/esmeralda.png';
import AvatarSelector from '../components/AvatarSelector';

test.skip('should change avatar', () => {
  const currentPersona = 'Zac';
  const wrapper = mount(<AvatarSelector currentPersona={currentPersona} />);
  expect(wrapper.find('img[src"]').text()).toMatch(zac);
});
