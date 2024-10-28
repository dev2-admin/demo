
    "use strict";
var MedTable = function () {

    var initTable1 = function () {
        var table = $('#Medicine');

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

                url: baseUrl + '/api/Notion_By_Type/Drugs',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {

                    return jsonData;
                }
            },
            // Order settings
            //order: [[1, 'desc']],
            columns: [

             
                { data: 'OptionalField_3' },
                { data: 'Notion_Code' },
                { data: 'OptionalField_1' },
                { data: 'Notion_Name' },
                { data: 'Notion_Description' },
                { data: 'OptionalField_2' },
               

            ],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(0, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="10">' + group + '</td></tr>',
                        );
                        last = group;
                    }
                });
            },

            columnDefs: [
				{
					// hide columns by index number
					targets: [0],
					visible: false,
				}


           
            ],
        });


        var oTable = $('#Medicine').DataTable();  
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
    MedTable.init();
});