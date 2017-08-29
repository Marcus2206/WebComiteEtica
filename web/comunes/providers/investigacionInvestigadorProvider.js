var app=angular.module("app");

function InvestigacionInvestigadorRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new InvestigacionInvestigadorRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("investigacionInvestigadorRR", InvestigacionInvestigadorRRProvider);
