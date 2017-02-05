fix the gulp task for css
fix trailing spaces
fix tests line 16, 17  it('reads a JSON file and asserts that it has text and title properties', () => {
    expect(invertedIndexTest.validFiles(wrongFile.title)[1]).toBe('Invalid JSON file');
  });
  fix redundant tests
  airbnb specs 80 characters
  test cases should be more specific
  rewrite search index to accept parameters in the right order
  take note: The searchIndex filename argument is optional i.e searchIndex(...terms) and searchIndex(‘filename’, ...terms)  should be valid method calls.
give space between methods
arrays should use foreach for iteration
title should be included in the search
use status messages for the validateFiles method
reformat the try-catch to be properly formatted