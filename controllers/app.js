const app = angular.module('InvertedIndexApp', []);

app.controller('InvertedIndexController', ($scope) => {
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
    if (typeof (fileDoc !== 'Blob')) {
      $scope.uploaderError = 'select and upload a json object and then create index';
    }
    $scope.newIndex = new InvertedIndexClass();
    const reader = new FileReader();
    reader.readAsText(fileDoc);
    reader.onload = (event) => {
      $scope.readybooks = event.target.result;
      $scope.validationResult = $scope.newIndex.validFiles($scope.readybooks);
      alert($scope.validationResult[1]);
    };
  };
  $scope.submitIndex = () => {
    if ($scope.validationResult[0] === true) {
      $scope.indexOfWords = $scope.newIndex.createIndex(JSON.parse($scope.readybooks));
      $scope.titles = titlesList($scope.newIndex.books.length);
      $scope.arrayLength = numToArray($scope.newIndex.books.length);
      $scope.showIndex = true;
      $scope.showSearch = false;
    }
  };


  $scope.searchJson = () => {
    if ($scope.searchTerms === undefined) {
      $scope.showError = 'Please enter valid search terms';
    } else if ($scope.indexOfWords === undefined) {
      $scope.showError = 'Please upload a Json object first before searching';
    }    else    {
      $scope.searchResult = $scope.newIndex.searchIndex($scope.searchTerms);
      $scope.showIndex = false;
      $scope.showSearch = true;
    }
  };
});

