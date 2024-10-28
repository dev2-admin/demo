"use strict";
var EmployeeTable = function () {

    var initTable1 = function () {
        var table = $('#Employee_List');

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
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    className:'dt-center',
                    width:100,
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
                                                                <a class="dropdown-item" href="javascript:void(0)" id="ViewProfile" ><i
                                                                 class="fa fa-eye"></i>View Profile</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                           class="fa fa-tasks" ></i>Start Encounter</a>
                                                       <a class="dropdown-item" href="#"><i
                                                             class="fa fa-stop-circle" ></i>End Encounter</a>
                                                            </div>
                                                        </div>
                       

                        `;
                    },
                },

                {
                    targets: 10,
                    title: 'Status',
                    width: 80,
                    className: 'dt-center',
                    
                   
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
    EmployeeTable.init();
});