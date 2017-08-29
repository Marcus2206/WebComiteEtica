var app=angular.module("app");

function SedeRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new SedeRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("sedeRR", SedeRRProvider);