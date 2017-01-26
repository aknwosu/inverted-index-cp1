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
      this.parsedBooks.forEach((entry) => {
        if (entry.title === undefined || entry.text === undefined) {
          throw new Error('Invalid Format');
        }
      });
      return [true, 'Success'];
    } catch (error) {
      if (error.message === 'Invalid Format') {
        return (false, 'this Index takes books with Title and Text property only');
      } else if (error.name === 'SyntaxError') {
        return [false, 'Invalid JSON file'];
      }
    }
  }
/**
   * checks if the passed in JSON object is valid
   * @param{object}books;
   * @returns{object};
   */
  createIndex(books) {
    this.books = (books);

    for (let i = 0; i < books.length; i += 1) {
      const textIndex = books[i].text.toLowerCase().match(/\w+/g);
      for (let j = 0; j < textIndex.length; j += 1) {
        if (this.index[textIndex[j]] === undefined) {
          this.index[textIndex[j]] = {};
          this.index[textIndex[j]][i] = true;
        } else {
          this.index[textIndex[j]][i] = true;
        }
      }
    }
    return this.index;
  }
/**
   @param {String} queries
  * @return {Object} An Object Containing the Various words and their Locations.
*/
  searchIndex(queries) {
    const searchResult = {};
    if (typeof (queries) === typeof []) {
      queries = queries.join();
    }
    queries = queries.toLowerCase().match(/\w+/g);
    for (let word = 0; word < queries.length; word += 1) {
      if (this.index[queries[word]]) {
        searchResult[queries[word]] = this.index[queries[word]];
      }
    }
    return searchResult;
  }
}
