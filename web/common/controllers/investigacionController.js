var app = angular.module("app");

app.controller("EditInvestigacionController",
        ['$scope', 'investigacion', 'parametros', 'investigacionRemoteResource',
            'coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource',
            'investigadorRR', 'investigacionInvestigadorRR',
            'sedeRR', 'investigacionSedeRR',
            '$location', "$log", '$filter', "$uibModalInstance", "$confirm", 'SweetAlert',
            function ($scope, investigacion, parametros, investigacionRemoteResource,
                    coordinadorRemoteResource, investigacionCoordinadorRemoteResource,
                    investigadorRR, investigacionInvestigadorRR,
                    sedeRR, investigacionSedeRR,
                    $location, $log, $filter, $uibModalInstance, $confirm, SweetAlert) {

                $scope.parametros = parametros;
                $scope.deshabilitado = false;

                $scope.investigacionCoordinadors = [];
                $scope.investigacionInvestigadors = [];
                $scope.investigacionSedes = [];

                $scope.nombreBoton = "Editar";

                $scope.coordinadorsSelectList = [];
                $scope.investigadorsSelectList = [];
                $scope.sedesSelectList = [];

                $scope.coordinadorSelect = {};
                $scope.investigadorSelect = {};
                $scope.sedeSelect = {};

                $scope.isCoordinador = true;
                $scope.isInvestigador = true;
                $scope.isSede = true;

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.paramEspecialidad = $scope.filtrar($scope.parametros, 'P003')[0].parametroDetalles;
                $scope.paramFase = $scope.filtrar($scope.parametros, 'P005')[0].parametroDetalles;
                $scope.paramTipoInvestigacion = $scope.filtrar($scope.parametros, 'P004')[0].parametroDetalles;

                $scope.investigacion = investigacion;

                $scope.guardar = function () {
                    $scope.investigacion.usuarioModifica = "sa";
                    $scope.investigacion.fechaModificacion = new Date();
                    investigacionRemoteResource.update($scope.investigacion)
                            .then(function (investigacionRespond) {
                                var listbox = document.getElementById("paramEspecialidad");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                investigacionRespond.paramEspecialidad = selText;
                                listbox = document.getElementById("paramFase");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                investigacionRespond.paramFase = selText;
                                listbox = document.getElementById("paramTipoInvestigacion");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                investigacionRespond.paramTipoInvestigacion = selText;

                                $uibModalInstance.dismiss(investigacionRespond);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                $uibModalInstance.dismiss('cancel');
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                        
                            });
                };

                /*Coordinadores seleccionables*/
                coordinadorRemoteResource.listCoordinadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (coordinadorsRespond) {
                            $scope.coordinadorsSelectList = coordinadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Investigadores seleccionables*/
                investigadorRR.listInvestigadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (investigadorRespond) {
                            $scope.investigadorsSelectList = investigadorRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Sedes seleccionables*/
                sedeRR.listSedeSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (sedeRespond) {
                            $scope.sedesSelectList = sedeRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });



                /*Detalle de Investigación con Coordinador*/
                investigacionCoordinadorRemoteResource.listCoordinadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (coordinadorsRespond) {
                            $scope.investigacionCoordinadors = coordinadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de Investigación Investigador*/
                investigacionInvestigadorRR.listInvestigadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (investigadorsRespond) {
                            $scope.investigacionInvestigadors = investigadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de Investigación Sede*/
                investigacionSedeRR.listSedeByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (sedesRespond) {
                            $scope.investigacionSedes = sedesRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Agregar detalles*/
                /*Agregar Coordinador*/
                $scope.agregarCoordinador = function () {
                    $scope.investigacionCoordinador = {id: {idInvestigacion: "",
                            idCoordinador: ""},
                        observacion: "",
                        usuarioIngresa: null,
                        fechaIngreso: null};

                    $scope.investigacionCoordinador.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionCoordinador.id.idCoordinador = $scope.coordinadorSelect.idCoordinador;
                    $scope.investigacionCoordinador.observacion = $scope.coordinadorSelect.observacion;
                    $scope.investigacionCoordinador.usuarioIngresa = "sa";
                    $scope.investigacionCoordinador.fechaIngreso = new Date();
                    investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
                            .then(function (invCoordRespond) {
                                var ic = $scope.investigacionCoordinador;
                                var c = $scope.coordinadorSelect;
                                var invCoordinador = [ic, c];

                                $scope.investigacionCoordinadors.push(invCoordinador);
                                $scope.coordinadorsSelectList.splice($scope.coordinadorsSelectList.indexOf($scope.coordinadorSelect), 1);
                                $scope.coordinadorSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Coordinador*/
                $scope.eliminarInvCoordinador = function (invCoordinador) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Coordinador"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                investigacionCoordinadorRemoteResource.delete(invCoordinador[0])
                                        .then(function (invCoordinadorRespond) {
                                            $scope.coordinadorsSelectList.push(invCoordinador[1]);
                                            $scope.investigacionCoordinadors.splice($scope.investigacionCoordinadors.indexOf(invCoordinador), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                /*Agregar Investigador*/
                $scope.agregarInvestigador = function () {
                    $scope.investigacionInvestigador = {id: {idInvestigacion: "",
                            idInvestigador: ""},
                        observacion: "",
                        usuarioIngresa: null,
                        fechaIngreso: null};

                    $scope.investigacionInvestigador.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionInvestigador.id.idInvestigador = $scope.investigadorSelect.idInvestigador;
                    $scope.investigacionInvestigador.observacion = $scope.investigadorSelect.observacion;
                    $scope.investigacionInvestigador.usuarioIngresa = "sa";
                    $scope.investigacionInvestigador.fechaIngreso = new Date();
                    investigacionInvestigadorRR.insert($scope.investigacionInvestigador)
                            .then(function (invInvesRespond) {
                                var ii = $scope.investigacionInvestigador;
                                var i = $scope.investigadorSelect;
                                var invInvestigador = [ii, i];

                                $scope.investigacionInvestigadors.push(invInvestigador);
                                $scope.investigadorsSelectList.splice($scope.investigadorsSelectList.indexOf($scope.investigadorSelect), 1);
                                $scope.investigadorSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Investigador*/
                $scope.eliminarInvInvestigador = function (invInvestigador) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Investigador"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                investigacionInvestigadorRR.delete(invInvestigador[0])
                                        .then(function (invInvestigadorRespond) {
                                            $scope.investigadorsSelectList.push(invInvestigador[1]);
                                            $scope.investigacionInvestigadors.splice($scope.investigacionInvestigadors.indexOf(invInvestigador), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                /*Agregar Sede*/
                $scope.agregarSede = function () {
                    $scope.investigacionSede = {id: {idInvestigacion: "",
                            idSede: ""},
                        observacion: "",
                        usuarioIngresa: null,
                        fechaIngreso: null};

                    $scope.investigacionSede.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionSede.id.idSede = $scope.sedeSelect.idSede;
                    $scope.investigacionSede.observacion = $scope.sedeSelect.observacion;
                    $scope.investigacionSede.usuarioIngresa = "sa";
                    $scope.investigacionSede.fechaIngreso = new Date();
                    investigacionSedeRR.insert($scope.investigacionSede)
                            .then(function (invSedeRespond) {
                                var ii = $scope.investigacionSede;
                                var i = $scope.sedeSelect;
                                var invSede = {idInvestigacion: $scope.investigacionSede.id.idInvestigacion,
                                    idSede: $scope.investigacionSede.id.idSede,
                                    nombre: $scope.sedeSelect.nombre,
                                    idDepartamento: $scope.sedeSelect.idDepartamento,
                                    idProvincia: $scope.sedeSelect.idProvincia,
                                    idDistrito: $scope.sedeSelect.idDistrito};

                                //$location.path("investigacionEdit/"+$scope.investigacion.idInvestigacion);  

                                //$log.log(invSede);
                                $scope.investigacionSedes.push(invSede);
                                $scope.sedesSelectList.splice($scope.sedesSelectList.indexOf($scope.sedeSelect), 1);
                                $scope.sedeSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Sede*/
                $scope.eliminarInvSede = function (invSede) {
                    var idSede = {id: {idInvestigacion: invSede.idInvestigacion,
                            idSede: invSede.idSede},
                        observacion: ""
                    };
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Sede",
                        settings: "{size: 'sm'}"
                    })
                            .then(function () {
                                investigacionSedeRR.delete(idSede)
                                        .then(function (invInvestigadorRespond) {
                                            var sedeSelect = {idSede: invSede.idSede,
                                                nombre: invSede.nombre,
                                                idDepartamento: invSede.idDepartamento,
                                                idProvincia: invSede.idProvincia,
                                                idDistrito: invSede.idDistrito};
                                            $scope.sedesSelectList.push(sedeSelect);
                                            $scope.investigacionSedes.splice($scope.investigacionSedes.indexOf(invSede), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cerrarOtras = true;
            }]);

app.controller("ListInvestigacionController", ['$scope', "investigacions", "investigacionRemoteResource", '$location', "$log", "$route", "$uibModal", "$confirm", 'SweetAlert', function ($scope, investigacions, investigacionRemoteResource, $location, $log, $route, $uibModal, $confirm, SweetAlert) {
        /*Se obtiene lista de coordinadores*/
        $scope.investigacions = investigacions;
        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;

        /*Calculando número de páginas*/
        $scope.numberOfPages = function () {
            return Math.ceil($scope.investigacions.length / $scope.pageSize);
        };

        /*Ir a la sgte página*/
        $scope.setNextPagina = function () {
            $scope.currentPage = $scope.currentPage + 1;
            return $scope.currentPage;
        };


//        $scope.delete=function(investigacion){
//            investigacionRemoteResource.delete(investigacion)
//                .then(function(investigacionResult) {
//                    $scope.investigacions.splice($scope.investigacions.indexOf(investigacion),1);
//                    //Mensaje de éxito
//                }, function(bussinessMessages) {
//                    $scope.bussinessMessages = bussinessMessages;
//                    //Mensaje de error
//                });
//        };

        /*Editar un registro*/
        $scope.editarModal = function (investigacionObj) {
            var modalInstance = $uibModal.open({
                templateUrl: 'investigacion/investigacionEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                controller: "EditInvestigacionController",
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    investigacion: function () {
                        return investigacionRemoteResource.get(investigacionObj.idInvestigacion);
                    },
                    parametros: ['parametroRR', function (parametroRR) {
                            return parametroRR.list();
                        }]
                }
            });

            modalInstance.result.then(function () {
                //Si no se devuelve nada
            }, function (data) {
                //Si devuelve un objeto
                if (data !== "cancel") {
                    if (data !== "backdrop click") {
                        if (data !== "escape key press") {
                            //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                            var index = $scope.investigacions.indexOf(investigacionObj);
                            if (index !== -1) {
                                $scope.investigacions[index] = data;
                            }
                        }
                    }
                } else {
                    //Si es cancel
                }
            });
        };

        /*Crear un registro*/
        $scope.nuevoModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'investigacion/investigacionEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                controller: "NewInvestigacionController",
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    parametros: ['parametroRR', function (parametroRR) {
                            return parametroRR.list();
                        }]
                }
            });

            modalInstance.result.then(function () {
                //Si no se devuelve nada
            }, function (data) {
                //Si devuelve un objeto
                if (data !== "cancel") {
                    if (data !== "backdrop click") {
                        if (data !== "escape key press") {
                            //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                            $scope.investigacions.push(data);

                        }
                    }
                } else {
                    //Si es cancel
                }
            });
        };

        $scope.eliminar = function (investigacion) {
            //Se prepara confirm
            SweetAlert.swal({
                title: '¿Está seguro de eliminar este registro?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    //Si se presiona Sí.
                    investigacionRemoteResource.delete(investigacion)
                            .then(function (investigacionResult) {
                                //Se la elimenación es exitosa.
                                $scope.investigacions.splice($scope.investigacions.indexOf(investigacion), 1);
                                SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Advertencia", "La investigación se encuentra activa.", "warning");
                                //$scope.bussinessMessages = bussinessMessages;
                            });
                } else {

                }
            });

        };

    }]);

app.controller("NewInvestigacionController",
        ['$scope', 'investigacionRemoteResource',
            'parametros', '$location', "$log", "$uibModalInstance", 'SweetAlert',
            function ($scope, investigacionRemoteResource,
                    parametros, $location, $log, $uibModalInstance, SweetAlert) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.isCoordinador = true;
                $scope.isInvestigador = true;
                $scope.isSede = true;

                $scope.nombreBoton = "Nuevo";
                $scope.deshabilitado = true;
                $scope.parametros = parametros;
                $scope.paramEspecialidad = $scope.filtrar($scope.parametros, 'P003')[0].parametroDetalles;
                $scope.paramFase = $scope.filtrar($scope.parametros, 'P005')[0].parametroDetalles;
                $scope.paramTipoInvestigacion = $scope.filtrar($scope.parametros, 'P004')[0].parametroDetalles;

                /*Se construyer el json*/
                $scope.investigacion = {
                    idInvestigacion: "",
                    protocolo: "",
                    titulo: "",
                    paramEspecialidad: "",
                    paramFase: "",
                    paramTipoInvestigacion: "",
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: "",
                    fechaModificacion: ""//,
//            investigacionMonitors:[],
//            investigacionCoordinadors:[],
//            investigacionInvestigadors:[],
//            registros:[],
//            investigacionSedes:[]
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.investigacion.usuarioIngresa = "user1";
                    $scope.investigacion.fechaIngreso = new Date();
                    investigacionRemoteResource.insert($scope.investigacion)
                            .then(function (investigacionRespond) {
                                var listbox = document.getElementById("paramEspecialidad");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                investigacionRespond.paramEspecialidad = selText;
                                listbox = document.getElementById("paramFase");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                investigacionRespond.paramFase = selText;
                                listbox = document.getElementById("paramTipoInvestigacion");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                investigacionRespond.paramTipoInvestigacion = selText;

                                $uibModalInstance.dismiss(investigacionRespond);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                $uibModalInstance.dismiss('cancel');
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);
