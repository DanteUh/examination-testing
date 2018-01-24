import React from 'react';
import { render, mount } from 'enzyme';
import CreateNewComment from '../components/CreateNewComment';
import setCommentsFromLocalStorage from '../components/Comments';

test('render createNewComment', () => {
  render(<CreateNewComment postId='' author='' updateComments={setCommentsFromLocalStorage} />);
});
