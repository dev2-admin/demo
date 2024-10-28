var med = med || {};
(function () {

    med.ui_setBusy = function (element, text, freezeDelay) {
        FreezeUI({ element: element, text: text ? text : ' ', freezeDelay: freezeDelay });
    };

    med.ui_clearBusy = function (element, freezeDelay) {
        UnFreezeUI({ element: element,freezeDelay: freezeDelay });
    };

})();
