import * as api from '../api';
import fakePosts from '../fakePosts';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

describe('Posts tests', () => {
  it('should fetch all posts', () => {
    const stringifiedPosts = JSON.stringify(fakePosts.data);
    localStorage.setItem('posts', stringifiedPosts);
    const fetchedPosts = api.fetchAllPosts();
    expect(fetchedPosts).toEqual(fakePosts.data);
  });
  it('should remove post', () => {
    const postId = '565ddy34';
    api.storePostObject(fakePosts.data);
    const fetchedOriginalPosts = api.fetchAllPosts();
    expect(fetchedOriginalPosts.length).toBe(3);
    api.removePost(postId);
    const fetchedNewPosts = api.fetchAllPosts();
    expect(fetchedNewPosts.length).toBe(2);
  });
});

describe('Comments tests', () => {
  it.skip('should store comment object', () => {
    const commentObject = {comment: 'Hello Mr. Bister!', postId: 1, author: 'Hej'};
    api.storeCommentObject(object);
    const storageItem = JSON.parse(localStorage.getItem('comments'));
    expect(storageItem).toBe(commentObject);
  });

  it.skip('should remove comment', () => {
  });
});
