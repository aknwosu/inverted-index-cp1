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

  it('reads a JSON file and asserts that it valid',
  () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(validBook))[1])
    .toBe('Success');
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
