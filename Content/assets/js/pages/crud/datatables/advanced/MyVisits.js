"use strict";
var KTDatatablesAdvancedColumnVisibility = function () {

    var initTable1 = function () {
        var table = $('#kt_table_1');

        // begin first table
        table.DataTable({

            "scrollX": true,
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
                //{
                //    // hide columns by index number
                //    targets: [0, 1],
                //    visible: false,
                //},
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100,
                    render: function (data, type, full, meta) {
                        return `

                           <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu"
                                                                aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item " href="#" style='color:red'><i class="fa fa-eye" style='color:red'></i> View</a>
                                                               
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },
               

            ],
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
    KTDatatablesAdvancedColumnVisibility.init();
});