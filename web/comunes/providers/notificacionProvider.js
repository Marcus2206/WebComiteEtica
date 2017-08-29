var app=angular.module("app");

function NotificacionRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new NotificacionRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("notificacionRR", NotificacionRRProvider);