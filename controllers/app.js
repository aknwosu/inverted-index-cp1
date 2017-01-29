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
    // console.log(arr);
    return arr;
  };

  $scope.uploader = () => {
    const fileDoc = document.getElementById('myJsonFile').files[0];
    $scope.fileDocName = fileDoc.name;
    if (typeof (fileDoc !== 'Blob')) {
      $scope.uploaderError = 'select and upload a json object and then create index'; // eslint-no constant condition
    }
    // $scope.newIndex = new InvertedIndexClass();
    const reader = new FileReader();
    reader.readAsText(fileDoc);
    reader.onload = (event) => {
      $scope.readybooks = event.target.result;
      $scope.validationResult = $scope.newIndex.validFiles($scope.readybooks);

      $scope.$apply(() => {
        if ($scope.validationResult[0]) {
          $scope.allValidatedBooks[$scope.fileDocName] = $scope.readybooks;
        }
      });
      alert($scope.validationResult[1]); // eslint-disable-line no-alert
    };
  };
  $scope.submitIndex = () => {
    if ($scope.validationResult[0] === true) {
      $scope.indexOfWords = $scope.newIndex.createIndex($scope.indexToBeCreated,
      JSON.parse($scope.allValidatedBooks[$scope.indexToBeCreated]));
      $scope.titles[$scope.indexToBeCreated] = titlesList($scope.newIndex.books.length);
      $scope.arrayLength[$scope.indexToBeCreated] = indexCount($scope.newIndex.books.length);
      $scope.showIndex = true;
      $scope.showSearch = false;
    }
    $scope.allTitles = $scope.titles;
    $scope.allArrayLength = $scope.arrayLength;
    console.log($scope.indexToBeSearched);
  };


  $scope.searchJson = () => {
    // let file = $scope.indexToBeSearched || null,
    if ($scope.searchTerms === undefined) {
      $scope.showError = 'Please enter valid search terms';
    } else if ($scope.indexOfWords === undefined) {
      $scope.showError = 'Please upload a Json object first before searching';
    } else {
      if ($scope.indexToBeSearched === undefined) {
        $scope.searchResult = $scope.newIndex.searchIndex($scope.searchTerms);
      } else {
        $scope.searchResult = $scope.newIndex.searchIndex($scope.searchTerms, $scope.indexToBeSearched);
      }
      $scope.showIndex = false;
      $scope.showSearch = true;
    }
  };
});

