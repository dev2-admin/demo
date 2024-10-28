"use strict";
var ViewRefillRequest = function () {

    var initTable1 = function () {
        var table = $('#View_Refill');

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
                    class: 'dt-center',
                    render: function (data, type, row, meta) {
                      

                        return `

                        <div class="dropdown">
                                        <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            Action
                                        </button>
                                        <div class="dropdown-menu"
                                             aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">
                                                <i class="fa fa-spinner"></i> Process Request
                                            </a>


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
    ViewRefillRequest.init();
    $("#View_Refill_wrapper").css("width", "100%")
});