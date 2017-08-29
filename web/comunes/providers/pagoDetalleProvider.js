var app=angular.module("app");

function PagoDetalleRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new PagoDetalleRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("pagoDetalleRR", PagoDetalleRRProvider);