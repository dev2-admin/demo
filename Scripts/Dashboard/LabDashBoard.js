"use strict";

// Class definition
var LabDashboard = function () {

    

    var initTable1 = function () {
        var table = $('#OrderSummary');
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
                                                              <a class="dropdown-item" href="#"><i class="la la-spinner" style="color:lightblue"></i>Process</a>
                                                               
                                                               <a class="dropdown-item" href="#"><i class="la la-ban" style="color:red"></i>Deny</a>
                                                               
                                                            </div>
                                                        </div>

                        
                        `;
                    },
                },
                
                {
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
                            2: { 'title': 'Delivered', 'class': ' kt-badge--danger' },
                            3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
                            4: { 'title': 'Success', 'class': ' kt-badge--success' },
                            5: { 'title': 'Info', 'class': ' kt-badge--info' },
                            6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                            7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                },
                
            ],
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