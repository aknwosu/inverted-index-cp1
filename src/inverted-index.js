/* eslint-disable no-unused-vars*/
/**
 * Class for Complete Inverted Index.
 * @class
 */
class InvertedIndexClass {
  /**
   * Class Instantiation.
   */
  constructor() {
    this.index = {};
    this.books = {};
    this.parsedBooks = {};
    this.allBooks = {};
  }
  /**
   * returns created index
   * @returns{object};
   */
  getIndex() {
    return this.index;
  }
  /**
   * Valid files
   * 
   * checks if the passed in JSON object is valid
   * 
   * @param {object} jsonObj accepts a json file and checks if it is valid
   * @returns {array} returns an array, the first value being true or false and the second valur being an error message
   */
  validFiles(jsonObj) {
    try {
      if (jsonObj === ' ' || jsonObj === '' || jsonObj === '""') {
        return [false, 'Error, empty file'];
      }
      this.parsedBooks = JSON.parse(jsonObj);
      const validityCheck = false;
      if (!this.parsedBooks.length) {
        throw new Error('Invalid Format');
      }
      this.parsedBooks.forEach((entry) => {
        if (entry.title === undefined || entry.text === undefined) {
          throw new Error('Invalid Format');
        }
      });
      return [true, 'Success'];
    } catch (error) {
      if (error.message === 'Invalid Format') {
        return [false, 'this Index takes books with Title and Text property only'];
      } else if (error.name === 'SyntaxError') {
        return [false, 'Invalid JSON file'];
      }
    }
  }
/**
   *
   * @param{string}  filename accepts a string name for a file;
   * @param{object} books is a json object for which an index is to be created
   * @returns{object};
   */
  createIndex(filename, books) {
    this.index[filename] = {};
    this.books = books;

    for (let i = 0; i < books.length; i += 1) {
      const textIndex = books[i].text.toLowerCase().match(/\w+/g);
      for (let j = 0; j < textIndex.length; j += 1) {
        if (this.index[filename][textIndex[j]] === undefined) {
          this.index[filename][textIndex[j]] = {};
          this.index[filename][textIndex[j]][i] = true;
        } else {
          this.index[filename][textIndex[j]][i] = true;
        }
      }
    }
    // this.allBooks[books] = this.index;
    return this.index;
  }
/**
 * @param{string} filename
   @param {array} queries
  * @return {Object} An Object Containing the Various words and their Locations.
*/
  searchIndex(queries, filename) {
    let filesToSearch = [];
    const searchResult = {};
    if (!filename) {
      filesToSearch = filesToSearch.concat(Object.keys(this.index));
    } else {
      filesToSearch.push(filename);
    }
    filesToSearch.forEach((searchKey) => {
      searchResult[searchKey] = {};
      if (typeof (queries) === typeof []) {
        queries = queries.join();
      }
      queries = queries.toLowerCase().match(/\w+/g);
      for (let word = 0; word < queries.length; word += 1) {
        if (this.index[searchKey][queries[word]]) {
          searchResult[searchKey][queries[word]] = this.index[searchKey][queries[word]];
        }
      }
    });
    return searchResult;
  }
}
