"use strict";
var loadData = function () {

    var initTable1 = function () {
        var table = $('#LinkedList');

        // begin first table
        table.DataTable({
            responsive: true,
            "bAutoWidth": false,

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
                   class: 'dt-center',
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
                                                                        class="fa fa-refresh"></i> Request Refill</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-calendar" ></i>Scheduled Appointments</a>
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-flask" ></i>Lab Test</a>
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-eye" ></i>View Profile</a>
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-history" ></i>View History</a>
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


    loadData.init();

    

});

var getEditRowData = function (row) {
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    openPopup(url, id, row);
};




//Add Data Function
function Add() {
    debugger
    var $buttonClicked = $('#SaveChanges');
    var url = $buttonClicked.data('url');
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        TenantId: $('#TenantId').val(),
        Description: $('#Description').val(),
        Code: $('#Code').val(),
        SubscriptionType: $('#SubscriptionType').val(),
        SubscriptionEnd: $('#SubscriptionEnd').val(),
        Active: $('#chkActive').val()
    };
    $.ajax({
        url: url,
        data: JSON.stringify(empObj),
        type: "Get",
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
//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmployeeID);
            $('#Name').val(result.Name);
            $('#Age').val(result.Age);
            $('#State').val(result.State);
            $('#Country').val(result.Country);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        Name: $('#Name').val(),
        Age: $('#Age').val(),
        State: $('#State').val(),
        Country: $('#Country').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmployeeID').val("");
            $('#Name').val("");
            $('#Age').val("");
            $('#State').val("");
            $('#Country').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Function for clearing the textboxes
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    if ($('#Code').val().trim() == "") {
        $('#Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Code').css('border-color', 'lightgrey');
    }
    if ($('#SubscriptionType').val().trim() == "") {
        $('#SubscriptionType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubscriptionType').css('border-color', 'lightgrey');
    }
    if ($('#SubscriptionEnd').val().trim() == "") {
        $('#SubscriptionEnd').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubscriptionEnd').css('border-color', 'lightgrey');
    }
    return isValid;
}