(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const emptyFile = require('./test/emptyFile.json');
const wrongFile = require('./test/wrongJsonObject.json');
const validBook = require('./test/books.json');
const wrongFormat = require('./test/wrongformat.txt');

const invertedIndexTest = new InvertedIndexClass();

describe('Read book data', () => {
  it('reads a JSON file and asserts that it not empty', () => {
    expect(invertedIndexTest.validFiles(emptyFile)[1]).toBe('Error, empty file');
  });
  it('reads a JSON file and asserts that it has the appropriate properties', () => {
    expect(invertedIndexTest.validFiles(wrongFile)[1]).toBe('Invalid JSON file');
  });
  it('reads a JSON file and asserts that it has text and title properties', () => {
    expect(invertedIndexTest.validFiles(wrongFile.title)[1]).toBe('Invalid JSON file');
  });
  it('parses received files into JSON objects', () => {
    expect(typeof (invertedIndexTest.validFiles(wrongFile))).toBe(typeof {});
  }); 
  it('reads a JSON file and asserts that it valid', () => {
     expect(invertedIndexTest.validFiles(JSON.stringify(validBook))[1]).toBe('Success');
  });
});

describe('Populate Index', () => {
  it('verifies that an Index is created once the JSON file has been read', () => {
    expect(invertedIndexTest.createIndex(validBook).alice).toBeDefined();
  });
  it('should map the string keys to the correct objects in the JSON array', () => {
    expect(invertedIndexTest.createIndex(validBook).of).toEqual({ 0: true, 1: true });
  });
  it('Should confirm correct index is returned', () => {
    expect(invertedIndexTest.getIndex().of).toEqual({ 0: true, 1: true });
    expect(Object.keys(invertedIndexTest.getIndex()).length).toEqual(25);
  });
});

describe('Search index', () => {
  it('returns an array of the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex('Alice Bicycle').alice).toEqual({ 0: true });
  });
  it('returns an array of the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex(['Alice', 'Bicycle']).alice).toEqual({ 0: true });
  });
});

},{"./test/books.json":2,"./test/emptyFile.json":3,"./test/wrongJsonObject.json":4,"./test/wrongformat.txt":5}],2:[function(require,module,exports){
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
module.exports={"topic":"birds","quotes":

[{"quote":"It is not only fine feathers that make fine birds.","author":"Aesop"},{"quote":"One swallow does not make a summer.","author":"Aristotle"},{"quote":"How helpless we are, like netted birds, when we are caught by desire!","author":"Belva Plain"},{"quote":"I realized that If I had to choose, I would rather have birds than airplanes.","author":"Charles Lindbergh"},{"quote":"A bird does not sing because it has an answer. It sings because it has a song.","author":"Chinese Proverb"},{"quote":"Fall is my favorite season in Los Angeles, watching the birds change color and fall from the trees.","author":"David Letterman"},{"quote":"I hope you love birds too. It is economical. It saves going to heaven.","author":"Emily Dickinson"},{"quote":"The moment a little boy is concerned with which is a jay and which is a sparrow, he can no longer see the birds or hear them sing.","author":"Eric Berne"},{"quote":"I once had a sparrow alight upon my shoulder for a moment, while I was hoeing in a village garden, and I felt that I was more distinguished by that circumstance that I should have been by any epaulet I could have worn.","author":"Henry David Thoreau"},{"quote":"Use what talents you possess: the woods would be very silent if no birds sang there except those that sang best.","author":"Henry Van Dyke"},{"quote":"Those little nimble musicians of the air, that warble forth their curious ditties, with which nature hath furnished them to the shame of art.","author":"Izaak Walton"},{"quote":"God loved the birds and invented trees. Man loved the birds and invented cages.","author":"Jacques Deval"},{"quote":"The very idea of a bird is a symbol and a suggestion to the poet. A bird seems to be at the top of the scale, so vehement and intense his life. . . . The beautiful vagabonds, endowed with every grace, masters of all climes, and knowing no bounds -- how many human aspirations are realised in their free, holiday-lives -- and how many suggestions to the poet in their flight and song!","author":"John Burroughs"},{"quote":"I value my garden more for being full of blackbirds than of cherries, and very frankly give them fruit for their songs.","author":"Joseph Addison"},{"quote":"I know why the caged bird sings.","author":"Maya Angelou"},{"quote":"Cranes carry this heavy mystical baggage. They're icons of fidelity and happiness. The Vietnamese believe cranes cart our souls up to heaven on our wings.","author":"Mitchell Burgess"},{"quote":"Our avian brothers are back to roost on the first leg of their annual sojourn south. Why them and not us? Maybe it's because we humans are meant to be rooted in one spot.","author":"Mitchell Burgess"},{"quote":"There'll be bluebirds over the white cliffs of Dover,<br>Tomorrow, just you wait and see.","author":"Nat Burton"},{"quote":"There is nothing in which the birds differ more from man than the way in which they can build and yet leave a landscape as it was before.","author":"Robert Lynd"},{"quote":"Birds sing after a storm; why shouldn't people feel as free to delight in whatever sunlight remains to them?","author":"Rose Kennedy"},{"quote":"Much talking is the cause of danger. Silence is the means of avoiding misfortune. The talkative parrot is shut up in a cage. Other birds, without speech, fly freely about.","author":"Saskya Pandita"},{"quote":"I know of only one bird - the parrot - that talks; and it can't fly very high.","author":"Wilbur Wright"},{"quote":"No bird soars too high if he soars with his own wings.","author":"William Blake"},{"quote":"When thou seest an eagle, thou seest a portion of genius; lift up thy head!","author":"William Blake"},{"quote":"You cannot fly like an eagle with the wings of a wren.","author":"William Henry Hudson"}]}

},{}],5:[function(require,module,exports){
`The Bermuda Triangle, also known as the Devil's Triangle, is a loosely-defined region 
in the western part of the North Atlantic Ocean, where a number of aircraft 
and ships are said to have disappeared under mysterious circumstances. 
Most reputable sources dismiss the idea that there is any mystery. 
The vicinity of the Bermuda Triangle is one of the most heavily traveled 
shipping lanes in the world, with ships frequently crossing through it 
for ports in the Americas, Europe, and the Caribbean islands. Cruise ships 
and pleasure craft regularly sail through the region, and commercial and private aircraft routinely fly over it.
Popular culture has attributed various disappearances to the paranormal or 
activity by extraterrestrial beings. Documented evidence indicates that a 
significant percentage of the incidents were spurious, inaccurately reported, or embellished by later authors`
},{}]},{},[1])