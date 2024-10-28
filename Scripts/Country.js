"use strict";
var CountryTable = function () {

    var initTable1 = function () {
        var table = $('#Country_List');

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
                url: baseUrl + '/api/Country',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    return jsonData;
                }
            },
            // Order settings
            order: [[2, 'asc']],

            columns: [
              
                { data: null, responsivePriority: 0 },
                { data: 'Country_ID' },
                { data: 'Country_Name' },
                { data: 'Country_Description' },
                { data: 'Country_Short_Code' },
                { data: 'Country_Calling_Code' },
                { data: 'Country_Flag_Image_URL' },
                //{ data: 'Entered_By' },
                //{ data: 'Entered_Date' },
                //{ data: 'Audit_Date' },
                //{ data: 'Audit_By' },

            ],
            columnDefs: [
				{
                    targets: 1,
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
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Country_ID + `, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Country_ID + `, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div>

                        `;
                    },
                },
            ],
        });
        var oTable = $('#Country_List').DataTable();
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
//Function for getting the Data Based upon Employee ID
function getbyID(Country_ID, flag) {

    $.ajax({
        url: baseUrl + '/api/Country/' + Country_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#AddCountry').data('url');
          
            openPopup(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for deleting employee's record
function Delete() {

    var ans = confirm("Are you sure you want to delete this Record?");

    var CountryObj = {
        Country_ID: $('#Country_ID').val(),
        Country_Name: $('#Country_Name').val(),
        Country_Description: $('#Country_Description').val(),
        Country_Short_Code: $('#Country_Short_Code').val(),
        Country_Calling_Code: $('#Country_Calling_Code').val(),
        Country_Flag_Image_URL: 1,
        Entered_Date: new Date($.now()),
        Entered_By: 3,

        Audit_Date: new Date($.now()),
        Audit_By: 2
       
    };

    if (ans) {
        $.ajax({
            url: baseUrl + '/api/Country',
            data: JSON.stringify(CountryObj),
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#myModal').modal('hide');
                //initilizeDataTable.init();
                $('#Country_List').DataTable().ajax.reload();
            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}
//function for updating employee's record

 
    $("#AddCountry").click(function () {
        var $buttonClicked = $(this);
        var url = $(this).data('url');
        var id = $buttonClicked.attr('data-id');
        openPopup(url,'','', "Create");
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

                    $('#Country_ID').val(row[0].Country_ID);
                    $('#Country_Name').val(row[0].Country_Name);
                    $('#Country_Description').val(row[0].Country_Description);
                    $('#Country_Short_Code').val(row[0].Country_Short_Code);
                    $('#Country_Calling_Code').val(row[0].Country_Calling_Code);

                    //$('#Contact_Person').val(row[0].Tenant_Contact_Person);
                    //$('#Contact').val(row[0].Tenant_Contact);
                }
                else if (flag == "Create") {
                    $('#Delete').hide();
                    $('#Update').hide();
                    $('#exampleModalLabel').text("Create Tenant");
                }
                else {
                
                    $('#Update').hide();
                    $('#SaveChanges').hide();
                    $('#exampleModalLabel').text("Delete");

                    $('#Country_ID').val(row[0].Country_ID);
                    $('#Country_Name').val(row[0].Country_Name);
                    $('#Country_Description').val(row[0].Country_Description);
                    $('#Country_Short_Code').val(row[0].Country_Short_Code);
                    $('#Country_Calling_Code').val(row[0].Country_Calling_Code);
                   
                }



            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });


    };
//Add Data Function
   
//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }

   

    var CountryObj = {
      
        Country_ID: $('#Country_ID').val(),
        Country_Name: $('#Country_Name').val(),
        Country_Description: $('#Country_Description').val(),
        Country_Short_Code: $('#Country_Short_Code').val(),
        Country_Calling_Code: $('#Country_Calling_Code').val(),
        Country_Flag_Image_URL: 2,
        Entered_Date: new Date($.now()),
        Entered_By: 3,
 
        Audit_Date: new Date($.now()),
        Audit_By: 2
    };
    $.ajax({
        
        url: baseUrl + '/api/Country',
        data: JSON.stringify(CountryObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            console.log(result);
            $('#myModal').modal('hide');

            $('#Country_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function Add() {

    var $buttonClicked = $('#SaveChanges');
    var url = $buttonClicked.data('url');
    var res = validate();
    if (res == false) {
        return false;
    }

    var CountryObj = {
             
        Country_ID: $('#Country_ID').val(),
        Country_Name: $('#Country_Name').val(),
        Country_Description: $('#Country_Description').val(),
        Country_Short_Code: $('#Country_Short_Code').val(),
        Country_Calling_Code: $('#Country_Calling_Code').val(),
        Country_Flag_Image_URL:1,
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 5,
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/Country',
        data: JSON.stringify(CountryObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');
            $('#Country_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
$("#Create").click(function () {
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    openPopup(url, id, '', "Create");
});

function validate() {
    var isValid = true;
    if ($('#Country_Name').val().trim() == "") {
        $('#Country_Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_Name').css('border-color', 'lightgrey');
    }
    if ($('#Country_Description').val().trim() == "") {
        $('#Country_Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_Description').css('border-color', 'lightgrey');
    }
    if ($('#Country_Short_Code').val().trim() == "") {
        $('#Country_Short_Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_Short_Code').css('border-color', 'lightgrey');
    }
    if ($('#Country_Calling_Code').val().trim() == "") {
        $('#Country_Calling_Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_Calling_Code').css('border-color', 'lightgrey');
    }
    return isValid;
}
function clearTextBox() {
    $('#Country_Name').val("");
    $('#Country_Description').val("");
    $('#Country_Short_Code').val("");
    $('#Country_Calling_Code').val("");
   
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Country_Name').css('border-color', 'lightgrey');
    $('#Country_Description').css('border-color', 'lightgrey');
    $('#Country_Short_Code').css('border-color', 'lightgrey');
    $('#Country_Calling_Code').css('border-color', 'lightgrey');
}