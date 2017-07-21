var app=angular.module("app");

function RegistroRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new RegistroRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("registroRR", RegistroRRProvider);