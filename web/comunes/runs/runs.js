var app = angular.module("app");

app.run(["$rootScope", 'auth', function ($rootScope, auth) {

        $rootScope.$on('$routeChangeStart', function ()
        {
            //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
            //la cuál hemos inyectado en la acción run de la aplicación
            auth.checkStatus();
        });

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });


    }]);

function isEmptyJSON(s) {
    for (var i in s) {
        return false;
    }
    return true;
}

function doGetCaretPosition(oField) {

    // Initialize
    var iCaretPos = 0;

    // IE Support
    if (document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart === '0')
        iCaretPos = oField.selectionStart;

    // Return results
    return iCaretPos;
}
   