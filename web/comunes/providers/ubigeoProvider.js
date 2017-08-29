var app=angular.module("app");

function UbigeoRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new UbigeoRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("ubigeoRR", UbigeoRRProvider);