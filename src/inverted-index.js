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
   * checks if the passed in JSON object is valid
   * @param{object}jsonObj;
   * @returns{array};
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
   * checks if the passed in JSON object is valid
   * @param{object}  filename;
   * @param{string} books
   * @returns{object};
   */
  createIndex(filename, books) {
    this.index[filename] = {};
    this.books = (books);

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
  searchIndex(filename, queries) {
    const searchResult = {};
    searchResult[filename] = {};
    if (typeof (queries) === typeof []) {
      queries = queries.join();
    }
    queries = queries.toLowerCase().match(/\w+/g);
    for (let word = 0; word < queries.length; word += 1) {
      if (this.index[filename][queries[word]]) {
        searchResult[filename][queries[word]] = this.index[filename][queries[word]];
      }
    }
    return searchResult;
  }
}
