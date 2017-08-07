var app=angular.module("app");

function PagoRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new PagoRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("pagoRR", PagoRRProvider);