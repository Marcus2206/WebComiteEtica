var app=angular.module("app");

function RegistroBitacoraRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new RegistroBitacoraRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("registroBitacoraRR", RegistroBitacoraRRProvider);