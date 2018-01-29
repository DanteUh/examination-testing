import React from 'react';
import { render, mount } from 'enzyme';
import zac from '../images/zac.png';
import morgana from '../images/morgana.png';
import esmeralda from '../images/esmeralda.png';
import AvatarSelector from '../components/AvatarSelector';

test('should select avatar', () => {
  const currentPersona = 'Esmeralda';
  const wrapper = mount(<AvatarSelector currentPersona={currentPersona} />);
  expect(wrapper.find('img').prop('src')).toMatch(esmeralda);
});
