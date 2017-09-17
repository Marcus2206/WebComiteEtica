var app=angular.module("app");

function UsuarioRRProvider() {
  var _baseUrl,_UrlOrigen;
  this.setBaseUrl = function(baseUrl, UrlOrigen) {
    _baseUrl = baseUrl;
    _UrlOrigen=UrlOrigen;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new UsuarioRR($http,$q, _baseUrl,$log,_UrlOrigen);
  }];
}

app.provider("usuarioRR", UsuarioRRProvider);