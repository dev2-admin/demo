﻿"use strict";
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
               
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100,
                    render: function (data, type, full, meta) {
                        return `
                           <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                          id="dropdownMenuButton" 
                                          data-toggle="dropdown" 
                                          aria-haspopup="true" 
                                          aria-expanded="false">
                                          Action
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                       <a class="dropdown-item" href="#" style="Color:blue"><i class="fa fa-eye" style="Color:blue"></i> View</a>
                                       <a class="dropdown-item" href="#" style="Color:Green"><i class="fa fa-calendar" style="Color:Green" ></i>Schedule Appointment</a>
                                  </div>
                            </div>
                        `;
                    },
                },
                {
                    targets:5,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: { 'title': 'In-Process', 'class': ' kt-badge--success' },
                            2: { 'title': 'Pending', 'class': ' kt-badge--danger' },
                            3: { 'title': 'Medicine Issued', 'class': ' kt-badge--primary' },
                            4: { 'title': 'Inprogress', 'class': ' kt-badge--brand' },

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                }
                //{
                //    targets: 0,
                //    title: 'Actions',
                //    orderable: false,
                //    render: function (data, type, full, meta) {
                //        return `
                //        <span class="dropdown">
                //            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">
                //              <i class="la la-ellipsis-h"></i>
                //            </a>
                //            <div class="dropdown-menu dropdown-menu-right">
                //                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit</a>
                //                <a class="dropdown-item" href="#"><i class="la la-trash"></i> Delete</a>
                //            </div>
                //        </span>
                //        `;
                //    },
                //}

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