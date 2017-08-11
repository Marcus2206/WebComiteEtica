/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.config(['baseUrl', 'investigacionRemoteResourceProvider',
    function (baseUrl, investigacionRemoteResourceProvider) {
        investigacionRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'coordinadorRemoteResourceProvider',
    function (baseUrl, coordinadorRemoteResourceProvider) {
        coordinadorRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'investigacionCoordinadorRemoteResourceProvider',
    function (baseUrl, investigacionCoordinadorRemoteResourceProvider) {
        investigacionCoordinadorRemoteResourceProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'parametroRRProvider',
    function (baseUrl, parametroRRProvider) {
        parametroRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'sedeRRProvider',
    function (baseUrl, sedeRRProvider) {
        sedeRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'ubigeoRRProvider',
    function (baseUrl, ubigeoRRProvider) {
        ubigeoRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'investigadorRRProvider',
    function (baseUrl, investigadorRRProvider) {
        investigadorRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'investigacionInvestigadorRRProvider',
    function (baseUrl, investigacionInvestigadorRRProvider) {
        investigacionInvestigadorRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'investigacionSedeRRProvider',
    function (baseUrl, investigacionSedeRRProvider) {
        investigacionSedeRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'monitorRRProvider',
    function (baseUrl, monitorRRProvider) {
        monitorRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'patrocinadorRRProvider',
    function (baseUrl, patrocinadorRRProvider) {
        patrocinadorRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'croRRProvider',
    function (baseUrl, croRRProvider) {
        croRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'correspondenciaRRProvider',
    function (baseUrl, correspondenciaRRProvider) {
        correspondenciaRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'correspondenciaFileRRProvider',
    function (baseUrl, correspondenciaFileRRProvider) {
        correspondenciaFileRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'registroRRProvider',
    function (baseUrl, registroRRProvider) {
        registroRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'fileRRProvider',
    function (baseUrl, fileRRProvider) {
        fileRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'fechaSesionRRProvider',
    function (baseUrl, fechaSesionRRProvider) {
        fechaSesionRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'pagoRRProvider',
    function (baseUrl, pagoRRProvider) {
        pagoRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'correspondenciaServicioRRProvider',
    function (baseUrl, correspondenciaServicioRRProvider) {
        correspondenciaServicioRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'pagoDetalleRRProvider',
    function (baseUrl, pagoDetalleRRProvider) {
        pagoDetalleRRProvider.setBaseUrl(baseUrl);
    }
]);

app.config(['baseUrl', 'usuarioRRProvider',
    function (baseUrl, usuarioRRProvider) {
        usuarioRRProvider.setBaseUrl(baseUrl);
    }
]);