var app=angular.module("app");

function FileRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new FileRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("fileRR", FileRRProvider);