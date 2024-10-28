"use strict";
var NotionTable = function () {

    var initTable1 = function () {
        var table = $('#Lab_List');

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
            ajax: {

                url: baseUrl + '/api/Notion_By_Type/Lab',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {

                    return jsonData;
                }
            },
            // Order settings
            order: [[1, 'desc']],





            columns: [

               
                { data: 'OptionalField_3' },
                { data: 'Notion_Code' },
                { data: 'Notion_Name' },
                { data: 'Notion_Description' },
                { data: 'OptionalField_1' },
                { data: 'OptionalField_2' },
                { data: 'Notion_Price' },
                
            ],

        });
        var oTable = $('#Lab_List').DataTable();
        $('#myInputTextField').keyup(function () {

            oTable.search($(this).val()).draw();
        });
    };

    return {

        //main function to initiate the module

        init: function () {
            initTable1();
        },

    };

}();

jQuery(document).ready(function () {
    NotionTable.init();

});


