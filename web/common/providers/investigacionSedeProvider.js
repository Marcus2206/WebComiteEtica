var app=angular.module("app");

function InvestigacionSedeRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new InvestigacionSedeRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("investigacionSedeRR", InvestigacionSedeRRProvider);
