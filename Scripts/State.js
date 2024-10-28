"use strict";
var CountryTable = function () {

    var initTable1 = function () {
        var table = $('#State_List');

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
            ajax: {
                url: baseUrl + '/api/State',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                
                    return jsonData;
                }
            },
            // Order settings
            order: [[3, 'asc']],

            columns: [
              
                { data: null, responsivePriority: 0 },
                { data: 'State_ID' },
                { data: 'Country_ID' },
                 { data: 'Country_Name' },
                { data: 'State_Name' },
                //{ data: 'State_Description' },
                //{ data: 'State_Short_Code' },
                //{ data: 'Entered_By' },
                //{ data: 'Entered_Date' },
                //{ data: 'Audit_Date' },
                //{ data: 'Audit_By' },

            ],
            columnDefs: [
				{
                    targets: 1,
                    title: 'State_ID',
                    orderable: false,
                    visible : false
                },
				{
                    targets: 2,
                    title: 'Country_ID',
                    orderable: false,
                    visible : false
                },
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 80,
                    className: 'dt-center',

                    render: function (data, type, full, meta) {

                        console.log(data);
                        return `

                                <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                         <div class="dropdown-menu"
                                                  aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.State_ID + `, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.State_ID + `, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div>

                        `;
                    },
                },
            ],
        });
        var oTable = $('#State_List').DataTable();
        $('#myInputTextField').keyup(function () {

            oTable.search($(this).val()).draw();
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
    CountryTable.init();
   
});


function Load_Combo_Country(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Country",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',





       
        //  data: JSON.stringify(provinceName),
        success: function (response) {

            var len = response.length;

         
            $.each(response, function () {
                $("#Country_ID").append($("<option     />").val(this.Country_ID).text(this.Country_Name));
            });


            if (seletedValue != undefined) {

                $('#Country_ID').val(seletedValue);
            }


        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}


$("#CreateState").click(function () {

    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    openPopup(url, id, '', "Create");
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#myModalContent').html(data);
            $('#myModal').modal(options);
            $('#myModal').modal('show');
            
            if (flag == "Update") {
                $('#Delete').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Update");
                
                $('#State_ID').val(row[0].State_ID);
                

                Load_Combo_Country(row[0].Country_ID);


                $('#State_Name').val(row[0].State_Name);
                $('#State_Description').val(row[0].State_Description);
                $('#State_Short_Code').val(row[0].State_Short_Code);

         
            }
            else if (flag == "Create") {
                $('#Delete').hide();
                $('#Update').hide();
                $('#exampleModalLabel').text("Create");
            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Delete");

                $('#State_ID').val(row[0].State_ID);


                Load_Combo_Country(row[0].Country_ID);


                $('#State_Name').val(row[0].State_Name);
                $('#State_Description').val(row[0].State_Description);
                $('#State_Short_Code').val(row[0].State_Short_Code);

            }



        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });


};
//Add Data Function
function Add() {
    var $buttonClicked = $('#SaveChanges');
    var url = $buttonClicked.data('url');
    var res = validate();
    if (res == false) {
        return false;
    }

    var StateObj = {
        State_ID: $('#State_ID').val(),
        Country_ID: $('#Country_ID').val(),
        State_Name: $('#State_Name').val(),
        State_Description: $('#State_Description').val(),
        State_Short_Code: $('#State_Short_Code').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/State',
        data: JSON.stringify(StateObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon State ID
function getbyID(State_ID, flag) {
  
    $.ajax({
        url: baseUrl + '/api/State/' + State_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateState').data('url');
        
            openPopup(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for updating State's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
   
    var StateObj = {
        State_ID: $('#State_ID').val(),
        Country_ID: $('#Country_ID').val(),
        State_Name: $('#State_Name').val(),
        State_Description: $('#State_Description').val(),
        State_Short_Code: $('#State_Short_Code').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    $.ajax({
        url: baseUrl + '/api/State',
        data: JSON.stringify(StateObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');

            $('#State_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

//function for deleting STate's record
function Delete() {
    // var ans = confirm("Are you sure you want to delete this Record?");
    var StateObj = {
        State_ID: $('#State_ID').val(),
        Country_ID: $('#Country_ID').val(),
        State_Name: $('#State_Name').val(),
        State_Description: $('#State_Description').val(),
        State_Short_Code: $('#State_Short_Code').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    med.message_confirm(
        "State " + "Waleed" + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/State/',
                    data: JSON.stringify(StateObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#State_List').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                        $('#State_List').DataTable().ajax.reload();
                    }
                });
            }
        }
    );



}
//Function for clearing the textboxes
function clearTextBox() {
    $('#State_ID').val("");
    $('#Country_ID').val("");
    $('#State_Name').val("");
    $('#State_Description').val("");
    $('#State_Short_Code').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Country_ID').css('border-color', 'lightgrey');
    $('#State_Name').css('border-color', 'lightgrey');
    $('#State_Short_Code').css('border-color', 'lightgrey');
    $('#State_Description').css('border-color', 'lightgrey');

}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#State_Name').val().trim() == "") {
        $('#State_Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State_Name').css('border-color', 'lightgrey');
    }
    if ($('#Country_ID').val().trim() == "") {
        $('#Country_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_ID').css('border-color', 'lightgrey');
    }
    if ($('#State_Description').val().trim() == "") {
        $('#State_Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State_Description').css('border-color', 'lightgrey');
    }
    if ($('#State_Short_Code').val().trim() == "") {
        $('#State_Short_Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State_Short_Code').css('border-color', 'lightgrey');
    }
    return isValid;
}