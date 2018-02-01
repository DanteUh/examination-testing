import React from 'react';
import { render, mount } from 'enzyme';
import setCommentsFromLocalStorage from '../components/Comments';
import CreateNewComment from '../components/CreateNewComment';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

describe('Create New Comment', () => {
  it('simulate a comment onChange', () => {
    const comment = "Hej alla glada människor!";
    const onChange = {target: {name: 'comment', value: comment}};
    const wrapper = mount(<CreateNewComment postId='2' author='Zac' updateComments={setCommentsFromLocalStorage} />);
    wrapper.find('textarea[name="comment"]').simulate('change', onChange);
    expect(wrapper.state().comment).toEqual(comment);
  });
  
  it.skip('simulate submiting a comment', () => {
    const comment = "Inte bra när man ej har bananer";
    const wrapper = mount(<CreateNewComment postId='2' author='Zac' updateComments={setCommentsFromLocalStorage} />);
    wrapper.setState({ comment });
    wrapper.find('form').simulate('submit');
    const fetchedComment = JSON.parse(localStorage.getItem('comments'));
    expect(fetchedComment).toEqual(comment);
  });
});
