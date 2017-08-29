var app=angular.module("app");

function ParametroRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new ParametroRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("parametroRR", ParametroRRProvider);