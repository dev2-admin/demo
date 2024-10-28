var med = med || {};
(function () {
    var showMessage = function (type, message, title, isHtml, opts) {

        if (!title) {
            title = message;
            message = undefined;
        }

        opts = opts || {};
        opts.title = title;
        opts.type = type;
        opts.confirmButtonText = opts.confirmButtonText || 'Ok';

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return Swal.fire(opts);
    };

    med.message_info = function (message, title, isHtml, opts) {
        return showMessage('info', message, title, isHtml, opts);
    };

    med.message_success = function (message, title, isHtml, opts) {
        return showMessage('success', message, title, isHtml, opts);
    };

    med.message_warn = function (message, title, isHtml, opts) {
        return showMessage('warning', message, title, isHtml, opts);
    };

    med.message_error = function (message, title, isHtml, opts) {
        return showMessage('error', message, title, isHtml, opts);
    };

    med.message_confirm = function (message, titleOrCallback, callback, isHtml, opts) {

        var title = undefined;

        if (typeof titleOrCallback === "function") {
            callback = titleOrCallback;
        }
        else if (titleOrCallback) {
            title = titleOrCallback;
        };

        opts = opts || {};
        opts.title = title ? title : 'Are You Sure';
        opts.type = 'warning';

        opts.confirmButtonText = opts.confirmButtonText || 'Yes';
        opts.cancelButtonText = opts.cancelButtonText || 'Close';
        opts.showCancelButton = true;

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return Swal.fire(opts).then(function(result) {
            callback && callback(result.value);
        });
    };
})();
