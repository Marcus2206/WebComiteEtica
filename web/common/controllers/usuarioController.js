var app = angular.module("app");

app.controller("NewUsuarioController",
        ['$scope', 'usuarioRR', "$log", "$uibModalInstance", "parametros",
            'SweetAlert',
            function ($scope, usuarioRR, $log, $uibModalInstance, parametros,
                    SweetAlert) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramPerfil = $scope.filtrar($scope.parametros, 'P010')[0].parametroDetalles;

                /*Se construyer el json*/
                $scope.usuario = {};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.usuario.usuarioIngresa = "user1";
                    $scope.usuario.fechaIngreso = new Date();
                    usuarioRR.insert($scope.usuario)
                            .then(function (usuarioResult) {
                                var listbox = document.getElementById("perfil");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                usuarioResult.perfil = selText;
                                $uibModalInstance.dismiss(usuarioResult);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);


app.controller("ListUsuarioController",
        ['$scope', "usuarios", "usuarioRR", "$log", "$location",
            "$uibModal", 'SweetAlert',
            function ($scope, usuarios, usuarioRR, $log, $location,
                    $uibModal, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.usuarios = usuarios;
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.usuarios.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (usuario) {
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
                            usuarioRR.delete(usuario)
                                    .then(function (usuarioResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.usuarios.splice($scope.usuarios.indexOf(usuario), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        //$scope.bussinessMessages = bussinessMessages;
                                        SweetAlert.swal("Advertencia", "La Sede esta asociada a una investigación activa.", "warning");

                                    });
                        } else {

                        }
                    });
                };

                /*Editar un registro*/
                $scope.editarModal = function (sedeObj) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'usuario/usuarioEdit.html',
                        controller: "EditUsuarioController",
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            sede: function () {
                                return usuarioRR.get(sedeObj.idSede);
                            }
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
                                    var index = $scope.usuarios.indexOf(sedeObj);
                                    if (index !== -1) {
                                        $scope.usuarios[index] = data;
                                    }
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };

                /*Ingresar un registro*/
                $scope.insertarModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'usuario/usuarioEdit.html',
                        controller: "NewUsuarioController",
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
                        //Si no devuelve nada.
                    }, function (data) {
                        //Si devuelve algo
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
//                                    $log.log(data);
                                    /*añade a la lista sin recargar la página*/
                                    $log.log(data);
                                    $scope.usuarios.push(data);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditUsuarioController",
        ['$scope', "usuario", 'usuarioRR',
            "$uibModalInstance", 'SweetAlert',
            function ($scope, usuario, usuarioRR,
                    $uibModalInstance, SweetAlert) {

                $scope.usuario = usuario;

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.usuario.usuarioModifica = "user1";
                    $scope.usuario.fechaModificacion = new Date();
                    usuarioRR.update($scope.usuario)
                            .then(function (sedeResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var listbox = document.getElementById("perfil");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                sedeResult.perfil = selText;

                                $uibModalInstance.dismiss(sedeResult);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    //Se devuelve cancel
                    $uibModalInstance.dismiss('cancel');
                };
            }]);
