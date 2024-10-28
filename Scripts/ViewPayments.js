﻿"use strict";
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
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-trash" ></i>Delete</a>
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },


                {
                    targets: 9,
               
       
                    render: function (data, type, full, meta) {
                        var status = {

                            1: { 'title': 'Paid', 'class': ' kt-badge--success'},
                            2: { 'title': 'Pending', 'class': ' kt-badge--danger' },
                          

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="width:100px;" class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
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
    EmployeeTable.init();
});