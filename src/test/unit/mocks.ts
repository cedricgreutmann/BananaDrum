import {assert} from 'chai';
// import {NoteSourceMock} from '../mocks/NoteSource';
import * as log from '../lib/logging';
import {instrumentCollection} from '../lib/example-instruments';
import {Library} from '../../prod/Library';

const library = Library(instrumentCollection);
const loadPromise = library.load();


describe('Logging', function() {
  const itemsToLog = [];
  log.set('logTest', itemsToLog);
  const returnedVar = log.get('logTest');

  it('returns things you set', () => assert(returnedVar === itemsToLog));

  it('is useful for adding things to arrays', () => {
    itemsToLog[0] = 'boink';
    assert(returnedVar[0] === 'boink');
  })
});


describe('WebAudio mock', function() {
  describe('AudioContext Mock', function() {
    const ctx = new AudioContext();
    it('can create AudioBuffers', async () => {
      const arrayBuffer = new ArrayBuffer(8);
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      assert(audioBuffer instanceof AudioBuffer);
    });
  });
});


// describe('NoteSource mock', function() {
//   const noteSource = new NoteSourceMock(library);
//   it('has a log of requested notes', async () => {
//     await loadPromise;
//     assert(Array.isArray(noteSource.requestLog));
//   });
//
//   it('starts with no logged requests', async () => {
//     await loadPromise;
//     assert(noteSource.requestLog.length === 0);
//   });
//
//   it('logs requests correctly', async () => {
//     await loadPromise;
//     const intervalStart = 1;
//     const intervalEnd = 530453080;
//     noteSource.getPlayableNotes(intervalStart, intervalEnd);
//     assert(noteSource.requestLog.length === 1);
//     assert(noteSource.requestLog[0].length === 2);
//     assert(noteSource.requestLog[0][0] === intervalStart);
//     assert(noteSource.requestLog[0][1] === intervalEnd);
//   });
// });


describe('fetch() mock', function() {
  const url = 'hello/borp';
  const fetchPromise = fetch(url); // Will be a promise at this point
  const requestLog = log.get('fetchRequestLog');
  const latestRequest = requestLog[requestLog.length - 1];

  let promiseResolver;
  const arrayBufferPromise = new Promise(resolve => promiseResolver = resolve);

  it('requests and logs the correct path', () => assert(latestRequest === url));

  it('returns a response we can get an ArrayBuffer from...', async () => {
    const response = await fetchPromise;
    const arrayBuffer = await response.arrayBuffer();
    promiseResolver(arrayBuffer); // To pass this onto later tests...
    assert(arrayBuffer instanceof ArrayBuffer);
  });

  // it('...and the ArrayBuffer has the url attached', async () => {
  //   const arrayBuffer = await arrayBufferPromise;
  //   assert(arrayBuffer.requestUrl === url);
  // });
});
