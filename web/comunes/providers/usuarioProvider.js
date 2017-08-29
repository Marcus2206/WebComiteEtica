var app=angular.module("app");

function UsuarioRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new UsuarioRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("usuarioRR", UsuarioRRProvider);