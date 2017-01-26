const app = angular.module('InvertedIndexApp', []);

app.controller('InvertedIndexController', ($scope) => {

  $scope.allValidatedBooks = {};

  const numToArray = (n) => {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
      arr.push(i);
    }
    return arr;
  };
  const titlesList = (n) => {
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
      $scope.uploaderError = 'select and upload a json object and then create index';
    }
    $scope.newIndex = new InvertedIndexClass();
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
      // console.log($scope.allValidatedBooks);
      alert($scope.validationResult[1]);
    };
  };
  $scope.submitIndex = () => {
    if ($scope.validationResult[0] === true) {
      console.log($scope.allValidatedBooks);
      console.log($scope.indexToBeCreated);
      $scope.indexOfWords = $scope.newIndex.createIndex($scope.indexToBeCreated, JSON.parse($scope.allValidatedBooks[$scope.indexToBeCreated]));
      console.log ($scope.indexOfWords);
      $scope.titles = titlesList($scope.newIndex.books.length);
      $scope.arrayLength = numToArray($scope.newIndex.books.length);
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
    } else {
      $scope.searchResult = $scope.newIndex.searchIndex($scope.indexToBeCreated, $scope.searchTerms);
      $scope.showIndex = false;
      $scope.showSearch = true;
    }
  };
});

