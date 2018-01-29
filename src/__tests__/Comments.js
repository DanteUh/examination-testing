import React from 'react';
import { render, mount } from 'enzyme';
import fakeComments from '../fakeComments';
import Comments from '../components/Comments';
import SingleComment from '../components/SingleComment';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

describe('Comments', () => {
  it('should set comments from local storage', () => {
    const postId = '45sfdf56';
    const stringifiedComments = JSON.stringify(fakeComments.data);
    const wrapper = mount(<Comments postId={postId} currentPersona='Morgana' />);
    localStorage.setItem('comments', stringifiedComments);
    wrapper.instance().setCommentsFromLocalStorage();
    expect(wrapper.state().comments.length).toEqual(2);
  });
  it('should render comment list', () => {
    const postId = '45sfdf56';
    const comments = fakeComments.data;
    const wrapper = mount(<Comments postId={postId} currentPersona='Zac' />);
    wrapper.instance().renderCommentList(comments);
    expect(wrapper.find('SingleComment')).toBeTruthy();
  });
});

describe('Single Comment', () => {
  it('should render a comment', () => {
    const comment = "Hejselihejs!";
    const onClick = () => {return "Hej"};
    const wrapper = render(<SingleComment id='1' author='Zac' onClick={onClick} currentPersona='Esmeralda' comment={comment} date="2017-02-25" />);
    expect(wrapper.find('p').first().text()).toEqual(comment);
  });
});
