var app=angular.module("app");

function FechaSesionRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new FechaSesionRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("fechaSesionRR", FechaSesionRRProvider);