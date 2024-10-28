"use strict";
var loadData = function () {

    var initTable1 = function () {
        var table = $('#ViewLinkedProfile');

        // begin first table
        table.DataTable({
            responsive: true,

            // DOM Layout settings
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
                    className: 'dt-center',
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
                                                                <!--<a class="dropdown-item" href="#"><i
                                                                        class="fa fa-edit"></i> Contact Admin</a>-->
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-trash" ></i>Approve Request</a>
                                                            </div>
                                                        </div>
                                
                                
                         
                        
                        `;
                    },
                },

                {
                    targets: -1,
                    title: 'Status',
                    className: 'dt-center',
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

    };

    return {

        //main function to initiate the module
        init: function () {
            initTable1();
        },

    };

}();






jQuery(document).ready(function () {


    loadData.init();



});