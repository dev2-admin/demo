"use strict";


function getData(Type, cb_func ) {
    debugger;
    $.ajax({
        url: baseUrl + "/api/lovPicker/" + Type,
        success: cb_func
        });
}

function LoadLovpopup(LovType) {
    getData(LovType, function (data) {
        var columns = [];
        data = data;
        var columnNames = Object.keys(data[0]);
        debugger;
        for (var i in columnNames) {
            if (i != 0) {
                columns.push({ data: columnNames[i], title: columnNames[i] });
            }
            else {
                columns.push({ data: null, responsivePriority: 0 });
                columns.push({ data: columnNames[i], title: columnNames[i] });
            }
        }
       var table = $('#LovTable').DataTable({
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'p>>`,

            //lengthMenu: [5, 10, 25, 50],

            pageLength: 5,

            //language: {
            //    'lengthMenu': 'Display _MENU_',
            //},

            // Order settings
            order: [[1, 'desc']],

            data: data,
            columns: columns,

            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 80,
                    className: 'dt-center',

                    render: function (data, type, full, meta) {
                       
                        console.log(data);
                        return `
                          <a class="btn btn-info" id="btnSelect" href="javascript:void(0);"><i class="fa fa-edit"></i> Select</a>
                        `;
                    },
                },
            ],
       });


        $('#LovTable tbody').on('click', '#btnSelect', function () {
            debugger;
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var rowData = row.data();
            $('#LovPopup').modal('hide');
        });

        $('#FilterText').keyup(function () {
            table.search($(this).val()).draw();
        })

        $("#LovTable_wrapper").css("width", "100%")


    });
};

function LoadLovpopup_Combo(LovType) {
    getData(LovType, function (data) {
        debugger;
        console.log(data);

        $.each(response, function () {
            $("#Qualification_Cadre_Lov").append($("<option     />").val(this.LOV_ID).text(this.LOV_Text));
        });
        
    });
};
   
    
    

   
