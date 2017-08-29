var app=angular.module("app");

function MonitorRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new MonitorRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("monitorRR", MonitorRRProvider);