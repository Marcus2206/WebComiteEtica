var app=angular.module("app");

function InvestigadorRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new InvestigadorRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("investigadorRR", InvestigadorRRProvider);