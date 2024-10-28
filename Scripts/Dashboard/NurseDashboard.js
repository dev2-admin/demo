﻿"use strict";

// Class definition
var LabDashboard = function () {



    var initTable1 = function () {
        var table = $('#patientlist');

        var docOrder = $('#docOrder');

        var Staff = $('#Staff');
        var stats = $('#stats');



        var quickLinks = $('#quickLinks');

        var todoList = $('#todoList');

        // begin first table
        table.DataTable({
            responsive: false,
            "scrollX": true,
            "scrolly": true,


            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": true,


            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',

                    orderable: false,

                    render: function (data, type, full, meta) {
                        return `
                          <div class="dropdown">
                                  <button class="btn btn-sm btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu"
                                                                aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-university"></i> Exam</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-eye" ></i>View Profile</a>
                                                               
                                                            </div>
                                                        </div>
                        `;
                    },
                },
            ],
        });

        docOrder.DataTable({
            responsive: true,
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false



        });

        Staff.DataTable({
            responsive: false,
            "scrollX": true,
            "scrolly": true,


            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": true,


            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',

                    orderable: false,

                    render: function (data, type, full, meta) {
                        return `
                          <div class="dropdown">
                                  <button class="btn btn-sm btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu"
                                                                aria-labelledby="dropdownMenuButton">
                                                                
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-eye" ></i>View Profile</a>
                                                               
                                                            </div>
                                                        </div>
                        `;
                    },
                },
            ],
        });

        stats.DataTable({
            responsive: false,
           
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": true,


            
        });

        quickLinks.DataTable({
            responsive: true,
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false,

            columnDefs: [
                {
                    targets: 1,
                    title: 'Name',
                    orderable: true,



                },
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: true,
                    width: 400,
                    className: "dt-left",
                    render: function (data, type, full, meta) {
                        return `
                           <div class="dropdown">
                                  <button class="btn btn-sm btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu"
                                                                aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-pen"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-times" ></i>Delete</a>
                                                               
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },
            ],
        });

        todoList.DataTable({
            responsive: true,
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false,

            columnDefs: [
                {
                    targets: 1,
                    title: 'Name',
                    orderable: true,



                },
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: true,
                    width: 300,
                    className: "dt-left",
                    render: function (data, type, full, meta) {
                        return `
                           <div class="dropdown">
                                  <button class="btn btn-sm btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu"
                                                                aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-pen"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-times" ></i>Delete</a>
                                                               
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },
            ],
        });

    };



    return {
        // Init demos
        init: function () {

            initTable1();

            // demo loading
            var loading = new KTDialog({ 'type': 'loader', 'placement': 'top center', 'message': 'Loading ...' });
            loading.show();

            setTimeout(function () {
                loading.hide();
            }, 3000);
        }
    };
}();

// Class initialization on page load
jQuery(document).ready(function () {
    LabDashboard.init();
});