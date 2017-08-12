var app=angular.module("app");

function CorreoRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CorreoRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("correoRR", CorreoRRProvider);