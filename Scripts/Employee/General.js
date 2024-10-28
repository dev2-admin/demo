"use strict";
var ListTable = function () {

    var initTable = function () {
        var table = $('#Table_List');

        // begin first table
        table.DataTable({
            responsive: true,
            "bAutoWidth": false,

            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

            lengthMenu: [5, 10, 25, 50],

            pageLength: 10,

            language: {
                'lengthMenu': 'Display _MENU_',
            },

            // Order settings
            order: [[1, 'desc']],


            columnDefs: [
               

            ],
        });

    

    };

    return {

        //main function to initiate the module
        init: function () {
            initTable();
        },

    };

}();



jQuery(document).ready(function () {
    ListTable.init();
    $('#Table_List_wrapper').css("width", "100%")
});