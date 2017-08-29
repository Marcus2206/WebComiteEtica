var app=angular.module("app");

function CroRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CroRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("croRR", CroRRProvider);