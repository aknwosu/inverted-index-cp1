(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint no-undef:0*/
const emptyFile = require('./test/emptyFile.json');
const wrongFile = require('./test/wrongJsonObject.json');
const validBook = require('./test/books.json');

const invertedIndexTest = new InvertedIndexClass();

describe('Read book data', () => {
  it('reads a JSON file and asserts that it not empty',
  () => {
    expect(invertedIndexTest.validFiles(emptyFile)[1])
    .toBe('Error, empty file');
  });

  it('reads a JSON file and asserts that it has the appropriate properties',
  () => {
    expect(invertedIndexTest.validFiles((wrongFile))[1])
    .toBe('Invalid JSON file');
  });

  it('reads a JSON file and asserts that it is valid',
  () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(validBook))[1])
    .toBe('Success');
  });

  it('reads a JSON file and asserts that it has the correct properties',
  () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(wrongFile))[1])
    .toBe('this Index takes books with Title and Text property only');
  });
});

describe('Populate Index', () => {
  it('verifies that an Index is created once the JSON file has been read',
  () => {
    expect(invertedIndexTest.createIndex('booky.json', validBook)['booky.json']
    .alice).toBeDefined();
  });

  it('should map the string keys to the correct objects in the JSON array',
  () => {
    expect(invertedIndexTest.createIndex('books.json', validBook)['books.json']
    .of).toEqual({ 0: true, 1: true });
  });

  it('Should confirm correct index is returned', () => {
    expect(invertedIndexTest.getIndex()['booky.json'].of)
    .toEqual({ 0: true, 1: true });
    expect(Object.keys(invertedIndexTest.getIndex()['booky.json'])
    .length).toEqual(31);
  });
});

describe('Search index', () => {
  it('returns the correct objects indices that contain the searched words',
  () => {
    expect(invertedIndexTest.searchIndex('booky.json', 'Alice Bicycle'))
    .toEqual({ 'booky.json': { alice: { 0: true } } });
  });

  it('accepts mixed cases and non-alphanumerical characters', () => {
    expect(invertedIndexTest.searchIndex('booky.json', 'AlIce aLliancE'))
    .toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } } });
  });

  it('Should accept an array as a search parameter, and knows the filename',
  () => {
    expect(invertedIndexTest.searchIndex(['booky.json', 'Alice', 'alliance']))
    .toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } } });
  });

  it('Should accept terms without a specified filename', () => {
    expect(invertedIndexTest.searchIndex(['Alice', 'alliance']))
    .toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } },
      'books.json': { alice: { 0: true }, alliance: { 1: true } } });
  });
});

},{"./test/books.json":2,"./test/emptyFile.json":3,"./test/wrongJsonObject.json":4}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],3:[function(require,module,exports){
module.exports=""
},{}],4:[function(require,module,exports){
module.exports=[{"topic":"birds", "quotes":

[{"quote":"It is not only fine feathers that make fine birds.","author":"Aesop"},{"quote":"One swallow does not make a summer.","author":"Aristotle"},{"quote":"How helpless we are, like netted birds, when we are caught by desire!","author":"Belva Plain"},{"quote":"I realized that If I had to choose, I would rather have birds than airplanes.","author":"Charles Lindbergh"},{"quote":"A bird does not sing because it has an answer. It sings because it has a song.","author":"Chinese Proverb"},{"quote":"Fall is my favorite season in Los Angeles, watching the birds change color and fall from the trees.","author":"David Letterman"},{"quote":"I hope you love birds too. It is economical. It saves going to heaven.","author":"Emily Dickinson"},{"quote":"The moment a little boy is concerned with which is a jay and which is a sparrow, he can no longer see the birds or hear them sing.","author":"Eric Berne"},{"quote":"I once had a sparrow alight upon my shoulder for a moment, while I was hoeing in a village garden, and I felt that I was more distinguished by that circumstance that I should have been by any epaulet I could have worn.","author":"Henry David Thoreau"},{"quote":"Use what talents you possess: the woods would be very silent if no birds sang there except those that sang best.","author":"Henry Van Dyke"},{"quote":"Those little nimble musicians of the air, that warble forth their curious ditties, with which nature hath furnished them to the shame of art.","author":"Izaak Walton"},{"quote":"God loved the birds and invented trees. Man loved the birds and invented cages.","author":"Jacques Deval"},{"quote":"The very idea of a bird is a symbol and a suggestion to the poet. A bird seems to be at the top of the scale, so vehement and intense his life. . . . The beautiful vagabonds, endowed with every grace, masters of all climes, and knowing no bounds -- how many human aspirations are realised in their free, holiday-lives -- and how many suggestions to the poet in their flight and song!","author":"John Burroughs"},{"quote":"I value my garden more for being full of blackbirds than of cherries, and very frankly give them fruit for their songs.","author":"Joseph Addison"},{"quote":"I know why the caged bird sings.","author":"Maya Angelou"},{"quote":"Cranes carry this heavy mystical baggage. They're icons of fidelity and happiness. The Vietnamese believe cranes cart our souls up to heaven on our wings.","author":"Mitchell Burgess"},{"quote":"Our avian brothers are back to roost on the first leg of their annual sojourn south. Why them and not us? Maybe it's because we humans are meant to be rooted in one spot.","author":"Mitchell Burgess"},{"quote":"There'll be bluebirds over the white cliffs of Dover,<br>Tomorrow, just you wait and see.","author":"Nat Burton"},{"quote":"There is nothing in which the birds differ more from man than the way in which they can build and yet leave a landscape as it was before.","author":"Robert Lynd"},{"quote":"Birds sing after a storm; why shouldn't people feel as free to delight in whatever sunlight remains to them?","author":"Rose Kennedy"},{"quote":"Much talking is the cause of danger. Silence is the means of avoiding misfortune. The talkative parrot is shut up in a cage. Other birds, without speech, fly freely about.","author":"Saskya Pandita"},{"quote":"I know of only one bird - the parrot - that talks; and it can't fly very high.","author":"Wilbur Wright"},{"quote":"No bird soars too high if he soars with his own wings.","author":"William Blake"},{"quote":"When thou seest an eagle, thou seest a portion of genius; lift up thy head!","author":"William Blake"},{"quote":"You cannot fly like an eagle with the wings of a wren.","author":"William Henry Hudson"}]}]

},{}]},{},[1])