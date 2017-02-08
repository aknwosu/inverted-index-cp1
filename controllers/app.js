/* eslint no-undef:0*/

const app = angular.module('InvertedIndexApp', []);

app.controller('InvertedIndexController', ($scope) => {
  $scope.allValidatedBooks = {};
  $scope.titles = {};
  $scope.arrayLength = {};
  $scope.newIndex = new InvertedIndexClass();

  const indexCount = (n) => {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
      arr.push(i);
    }
    return arr;
  };
  const titlesList = () => { // eslint-no constant
    const arr = [];
    const book = $scope.newIndex.books;
    book.forEach((bookTitle) => {
      arr.push(bookTitle.title);
    });
    return arr;
  };

  $scope.uploader = () => {
    const fileDoc = document.getElementById('myJsonFile').files[0];
    $scope.fileDocName = fileDoc.name;
    $scope.uploaderError
    = 'select and upload a json file and create index';
    const reader = new FileReader();
    reader.readAsText(fileDoc);
    reader.onload = (event) => {
      $scope.readybooks = event.target.result;
      $scope.validationResult = $scope.newIndex.validFiles($scope.readybooks);

      $scope.$apply(() => {
        if ($scope.validationResult.status === true) {
          $scope.allValidatedBooks[$scope.fileDocName] = $scope.readybooks;
          $scope.uploaderError
          = 'success! Please create an index of the uploaded book below';
        } else {
          $scope.uploaderError
          = ($scope.validationResult.statusMessage);
        }
      });
    };
  };
  $scope.submitIndex = () => {
    if ($scope.validationResult.status === true) {
      $scope.newIndex.createIndex($scope.indexToBeCreated,
        JSON.parse($scope.allValidatedBooks[$scope.indexToBeCreated]));
      $scope.indexOfWords = $scope.newIndex.getIndex();
      $scope.titles[$scope.indexToBeCreated]
      = titlesList($scope.newIndex.books.length);
      $scope.arrayLength[$scope.indexToBeCreated]
      = indexCount($scope.newIndex.books.length);
      $scope.showIndex = true;
      $scope.showSearch = false;
    }
    $scope.allTitles = $scope.titles;
    $scope.allArrayLength = $scope.arrayLength;
  };


  $scope.searchJson = () => {
    if ($scope.searchTerms === undefined) {
      $scope.showError = 'Please enter valid search terms';
    } else if ($scope.indexOfWords === undefined) {
      $scope.showError = 'Please upload a Json object first before searching';
    } else if ($scope.indexToBeSearched === undefined) {
      $scope.searchResult = $scope.newIndex.searchIndex($scope.searchTerms);
    } else {
      $scope.searchResult
      = $scope.newIndex.searchIndex($scope.indexToBeSearched,
      $scope.searchTerms);
    }
    $scope.showIndex = false;
    $scope.showSearch = true;
  };
});
