/* eslint no-undef:0*/
const emptyFile = require('./test/emptyFile.json');
const wrongFile = require('./test/wrongJsonObject.json');
const validBook = require('./test/books.json');
const trollTest = require('./test/trollTest.json');

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
    expect(typeof (invertedIndexTest.validFiles(validBook))).toBe(typeof {});
  });
  it('reads a JSON file and asserts that it valid', () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(validBook))[1]).toBe('Success');
  });
  it('reads a file and asserts that it invalid', () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(trollTest))[1]).toBe('this Index takes books with Title and Text property only');
  });
  it('reads a JSON file and asserts that it invalid', () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(wrongFile))[1]).toBe('this Index takes books with Title and Text property only');
  });
});

describe('Populate Index', () => {
  it('verifies that an Index is created once the JSON file has been read', () => {
    expect(invertedIndexTest.createIndex('booky.json', validBook)['booky.json'].alice).toBeDefined();
  });

  it('should map the string keys to the correct objects in the JSON array', () => {
    expect(invertedIndexTest.createIndex('books.json', validBook)['books.json'].of).toEqual({ 0: true, 1: true });
  });
  it('Should confirm correct index is returned', () => {
    expect(invertedIndexTest.getIndex()['booky.json'].of).toEqual({ 0: true, 1: true });
    expect(Object.keys(invertedIndexTest.getIndex()['booky.json']).length).toEqual(25);
  });
});

describe('Search index', () => {
  it('returns the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex('Alice Bicycle', 'booky.json')).toEqual({ 'booky.json': { alice: { 0: true } } });
  });
  it('returns the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex('AlIce aLliancE', 'booky.json')).toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } } });
  });
  it('Should accept an array as a search parameter returns the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex(['Alice', 'alliance'], 'booky.json')).toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } } });
  });
  it('Should accept an array as a search parameter returns the indices of the correct objects that contain the words in the search query', () => {
    expect(invertedIndexTest.searchIndex(['Alice', 'alliance'])).toEqual({ 'booky.json': { alice: { 0: true }, alliance: { 1: true } }, 'books.json': { alice: { 0: true }, alliance: { 1: true } } });
  });
});
