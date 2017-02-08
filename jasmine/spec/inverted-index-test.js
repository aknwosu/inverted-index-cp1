/* eslint no-undef:0*/
const emptyFile = require('./test/emptyFile.json');
const wrongFile = require('./test/wrongJsonObject.json');
const validBook = require('./test/books.json');

const invertedIndexTest = new InvertedIndexClass();


describe('Read book data', () => {
  it('reads a JSON file and asserts that its not empty',
  () => {
    expect(invertedIndexTest.validFiles(emptyFile).statusMessage)
    .toBe('Error, empty file');
  });

  it('reads a JSON file and asserts that it is valid',
  () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(validBook))
    .statusMessage).toBe('Success');
  });

  it('reads a JSON file and asserts that it has the correct properties',
  () => {
    expect(invertedIndexTest.validFiles(JSON.stringify(wrongFile))
    .statusMessage)
    .toBe('this Index takes books with Title and Text property only');
  });
});

describe('Populate Index', () => {
  invertedIndexTest.createIndex('books.json', validBook);
  it('verifies that an Index is created once the JSON file has been read',
  () => {
    expect(invertedIndexTest.getIndex()).toBeDefined();
  });

  it('should accept an optional parameter in the get index',
  () => {
    expect(invertedIndexTest.getIndex('books.json')).toBeDefined();
  });
});

describe('Search index', () => {
  invertedIndexTest.createIndex('books.json', validBook);
  it('returns the correct objects indices that contain the searched words',
  () => {
    expect(invertedIndexTest.searchIndex('books.json', 'Alice Bicycle'))
    .toEqual({ 'books.json': { alice: { 0: true } } });
  });

  it('accepts mixed cases and non-alphanumerical characters', () => {
    expect(invertedIndexTest.searchIndex('books.json', 'AlIce aLliancE'))
    .toEqual({ 'books.json': { alice: { 0: true }, alliance: { 1: true } } });
  });

  it('Should accept an array as a search parameter, and knows the filename',
  () => {
    expect(invertedIndexTest.searchIndex(['books.json', 'Alice', 'alliance']))
    .toEqual({ 'books.json': { alice: { 0: true }, alliance: { 1: true } } });
  });

  it('Should accept terms without a specified filename', () => {
    expect(invertedIndexTest.searchIndex(['Alice', 'alliance']))
    .toEqual({ 'books.json': { alice: { 0: true }, alliance: { 1: true } } });
  });
});
