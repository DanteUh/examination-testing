import * as api from '../api';
import fakePosts from '../fakePosts';
import fakeComments from '../fakeComments';

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
  it('should not fetch all posts', () => {
    const comments = JSON.stringify(fakePosts.data);
    localStorage.setItem('coments', comments);
    const fetchedComments = api.fetchAllCommments();
    expect(fetchedComments).toEqual([]);
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

  it('integration test post functions', () => {
    const postObject1 = api.createPostObject('Scary Things', 'Things that are scary is not really scary', 'Zac');
    const postObject2 = api.createPostObject('Bananas', 'Did you know that banans are berries?', 'Esmeralda');
    const database = [postObject1, postObject2];
    api.storePostObject(database);
    const fetchedPosts = api.fetchAllPosts();
    expect(fetchedPosts).toEqual(database);
    api.removePost(postObject1.id);
    const fetchedUpdatedPosts = api.fetchAllPosts();
    expect(fetchedUpdatedPosts).toEqual([postObject2]);
  });
});

describe('Comments tests', () => {
  it('should store comment object', () => {
    const commentObject = {comment: 'Hello Mr. Bister!', postId: 1, author: 'Hej'};
    api.storeCommentObject(commentObject);
    const storageItem = JSON.parse(localStorage.getItem('comments'));
    expect(storageItem).toEqual(commentObject);
  });
  it('should not fetch all comments', () => {
    const comments = JSON.stringify(fakeComments.data);
    localStorage.setItem('bananer', comments);
    const fetchedComments = api.fetchAllCommments();
    expect(fetchedComments).toEqual([]);
  });
  it('should filter comments', () => {
    const comments = [
      {comment: 'Hejpådig!', postId: 1, author: 'Steffe'},
      {comment: 'Inte bra!', postId: 2, author: 'Esmeralda'},
      {comment: 'Det tror jag inte?', postId: 3, author: 'Zac'},
      {comment: 'Vad vet jag?', postId: 2, author: 'Zac'}
    ];
    const expectedComment = [{comment: 'Inte bra!', postId: 2, author: 'Esmeralda'}, {comment: 'Vad vet jag?', postId: 2, author: 'Zac'}];
    const filteredComments = api.filterComments(comments, 2);
    expect(filteredComments).toEqual(expectedComment);
  });
  it('should remove comment', () => {
    const comments = [
      {id: 10, comment: 'Hejpådig!', postId: 1, author: 'Steffe'},
      {id: 11, comment: 'Inte bra!', postId: 2, author: 'Esmeralda'},
      {id: 12, comment: 'Det tror jag inte?', postId: 3, author: 'Zac'},
      {id: 13, comment: 'Vad vet jag?', postId: 2, author: 'Zac'}
    ];
    const stringyFiedArray = JSON.stringify(comments);
    localStorage.setItem('posts', stringyFiedArray);
    api.removeComment(12);
    const newComments = JSON.parse(localStorage.getItem('comments'));
    expect(newComments.length).toBe(3);
  });
});
