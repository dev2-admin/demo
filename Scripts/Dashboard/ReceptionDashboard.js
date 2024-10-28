"use strict";

// Class definition
var LabDashboard = function () {



    var initTable1 = function () {

        var table = $('#Appointments');

        var Staff = $('#Staff');
     
        var doctor = $('#Doctor');

        var QuickLinks = $('#QuickLinks');

        var Todolist = $('#Todolist');

        // begin first table
        table.DataTable({
            responsive: true,
            
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false,

            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: true,
                    width: 100,
                    className: "dt-center",
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
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-eye" ></i>View</a>
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },
            ],
        });

        Staff.DataTable({
            responsive: true,
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false



        });

        doctor.DataTable({
            responsive: true,
            "bPaginate": false,
            "bAutoWidth": false,
            "bFilter": false,
            "bInfo": false
        });

        QuickLinks.DataTable({
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

        Todolist.DataTable({
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
    $("#OrderSummary_wrapper").css("width", "100%");
});