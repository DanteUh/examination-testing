import React from 'react';
import { shallow, mount } from 'enzyme';
import fakePosts from '../fakePosts';
import Posts from '../components/Posts';
import CreateNewPost from '../components/CreateNewPost';
import SinglePost from '../components/SingleComment';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

describe('Posts test', () => {
  it('should render single post', () => {
    const wrapper = mount(<Posts currentPersona='Esmeralda' />);
    wrapper.setState({ posts: fakePosts.data });
    wrapper.instance().renderPostList(fakePosts.data);
    expect(wrapper.find('h2').first().text()).toEqual('Everyday Hero: When This Pregnant Woman Couldn’t Find A Seat On A Train, This Man Decided To Stand On His In Solidarity');
  });

  it('should remove post', () => {
    const wrapper = mount(<Posts currentPersona='Zac' />);
    localStorage.setItem('posts', JSON.stringify(fakePosts.data));
    const fetchedAllPosts = JSON.parse(localStorage.getItem('posts'));
    expect(fetchedAllPosts.length).toEqual(3);
    wrapper.instance().removePost('45sfdf56');
    const fetchedUpdatedPosts = JSON.parse(localStorage.getItem('posts'));
    expect(fetchedUpdatedPosts.length).toEqual(2);
  });

  it('should not remove post', () => {
    const wrapper = mount(<Posts currentPersona='Zac' />);
    localStorage.setItem('posts', JSON.stringify(fakePosts.data));
    const fetchedAllPosts = JSON.parse(localStorage.getItem('posts'));
    expect(fetchedAllPosts.length).toEqual(3);
    wrapper.instance().removePost('ASDFGH123');
    const fetchedUpdatedPosts = JSON.parse(localStorage.getItem('posts'));
    expect(fetchedUpdatedPosts.length).toEqual(3);
  });
});

describe('Create post tests', () => {
  it('simulating on change', () => {
    const content = 'Jag äter soppa!';
    const updatePosts = mount(<Posts currentPersona='Zac' />).instance().setPostFromLocalStorage;
    const wrapper = mount(<CreateNewPost author='Esmeralda' updatePosts={updatePosts} />);
    const onChange = {target: { name: 'content', value: content }};
    wrapper.find('textarea[name="content"]').simulate('change', onChange);
    expect(wrapper.state().content).toEqual(content);
  });
});