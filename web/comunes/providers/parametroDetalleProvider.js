var app=angular.module("app");

function ParametroDetalleRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new ParametroDetalleRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("parametroDetalleRR", ParametroDetalleRRProvider);