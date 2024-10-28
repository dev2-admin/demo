"use strict";
var table ;
var initilizeDataTable = function () {

    var initTable1 = function () {

        table = $('#AR_List');
        //debugger;
        table.DataTable({

            responsive: true,
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

            lengthMenu: [5, 10, 25, 50],

            pageLength: 5,

            language: {
                'lengthMenu': 'Display _MENU_',

            },

            // Order settings
            order: [[1, 'desc']],

            ajax: {

                //url: baseUrl + '/api/ChangeRequest',
                url: baseUrl + '/api/ChangeRequest/Dynamic/AR',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    //debugger;
                    return jsonData;
                }
            },

            columns: [
                { data: null, responsivePriority: 0 },
                //{ data: 'CR_ID' },
                { data: 'Tenant_Desc', title: 'Requested By' },
                { data: 'CR_Requested_Action' },
                { data: 'CR_Requested_Description' },
                { data: 'CR_Remarks' },
                { data: 'CR_Status_LOV_ID' },


            ],

            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 80,
                    className: 'dt-center',

                    render: function (data, type, full, meta) {
                       // console.log(data);
                        return `
                                <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                     aria-haspopup="true" aria-expanded="false"> Action
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.CR_ID + `, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                   </div>
                                </div>
                        `;
                    },
                },
                {
                    targets: 5,
                    render: function (data, type, full, meta) {
                        var status = {
                            302: { 'title': 'Pending', 'class': ' kt-badge--danger' },
                            Pending: { 'title': 'Pending', 'class': ' kt-badge--danger' },
                            303: { 'title': 'In Progress', 'class': ' kt-badge--brand' },
                            'In Progress': { 'title': 'In Progress', 'class': ' kt-badge--brand' },
                            304: { 'title': 'Completed', 'class': ' kt-badge--success' },
                            Completed: { 'title': 'Completed', 'class': ' kt-badge--success' },

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                }
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


$('#filterText').keyup(function () {

    table.DataTable().search($(this).val()).draw();
});

//--Create new Speciality button click function to open Popup Model
$(function () {
    
    $("#AddNew").click(function () {
       // clearTextBox();
        var $buttonClicked = $(this);
        var url = $(this).data('url');
        var id = $buttonClicked.attr('data-id');

        openPopup(url, id, '', "Create");

    });
    clearTextBox();
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    var options = { "backdrop": "static", keyboard: true };

    if (url == undefined || url == "" || url == null) {
        $('#myModal').modal('show');
        debugger;
        if (flag == "Update" || flag == "Delete") {
            $('#ID').val(row[0].CR_ID);
            $('#Requestedby').val(row[0].Tenant_Desc);
            $('#Request').val(row[0].CR_Requested_Description);
            $('#Remarks').val(row[0].CR_Remarks);
            Load_Combo_LOV("CR_RequestAction", "#ActionType", row[0].CR_Requested_Action_LOV_ID);
            Load_Combo_LOV("CR_Status", "#Status", row[0].CR_Requested_Action_LOV_ID);
            $('#ActionType').attr('disabled', true);
            $('#btnAction').text(flag);
            $("#ActionImage").attr('class', 'fa fa-trash');


            if (flag == "Delete") {
                $("#ActionImage").attr('class', 'fa fa-refresh');
            }
        }
        else if (flag == "Delete") {

            //$('#btnAction').html('Delete');
        }
        else {
            //debugger;
            Load_Combo_LOV("CR_RequestAction", "#ActionType", 0);
            Load_Combo_LOV("CR_Status", "#Status", 0);
            $('#ActionType').attr('disabled', true);

            $('#btnAction').html('Save');


        }
    }
    else {
        debugger;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#myModalContent').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');
                
                if (flag == "Update" || flag == "Delete") {
                    $('#ID').val(row[0].CR_ID);
                    $('#Requestedby').val(row[0].Tenant_Desc);
                    $('#Request').val(row[0].CR_Requested_Description);
                    $('#Remarks').val(row[0].CR_Remarks);
                    Load_Combo_LOV("CR_RequestAction", "#ActionType", row[0].CR_Requested_Action_LOV_ID);
                    Load_Combo_LOV("CR_Status", "#Status", row[0].CR_Status_LOV_ID);
                    $('#ActionType').attr('disabled', true);

                    $('#btnAction').html(flag);
                    $("#ActionImage").attr('class', 'fa fa-trash');

                    if (flag == "Delete") {
                        $("#ActionImage").attr('class', 'fa fa-refresh');
                    }
                }
                else if (flag == "Delete") {

                    //$('#btnAction').html('Delete');
                }
                else {
                    debugger;
                    Load_Combo_LOV("CR_RequestAction", "#ActionType", 0);
                    Load_Combo_LOV("CR_Status", "#Status", 0);
                    $('#ActionType').attr('disabled', true);

                    $('#btnAction').html('Save');
                }

            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });
    }

    $("#Status option:first-child").attr("disabled", "disabled");
    //$("#ActionType option:first-child").attr("disabled", "disabled");
    $('#ActionType').attr('disabled', true);

};
//Add Data Function
function Add() {
    var $buttonClicked = $('#SaveChanges');
    var url = $buttonClicked.data('url');
    var res = validate();
    if (res == false) {
        return false;
    }

    var ChangeReqObj = GetModel();

    //---Static id passed, login id will be set automatically of loged in person
    ChangeReqObj.Tenant_ID = 13;


    $.ajax({
        url: baseUrl + '/api/ChangeRequest',
        data: JSON.stringify(ChangeReqObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#AR_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon ID
function getbyID(ID, flag) {
    /*debugger*/;
    $.ajax({
        url: baseUrl + '/api/ChangeRequest/' + ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            var url = viewurl; //$('#CreateSpeciality').data('url');
            openPopup(url, '', result, flag)
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for updating employee's record
function Update() {

    var res = validate();
    if (res == false) {
        return false;
    }
    var ChangeReqObj = GetModel();
    ChangeReqObj.Tenant_ID = 13
    /*debugger*/;

    $.ajax({
        url: baseUrl + '/api/ChangeRequest',
        data: JSON.stringify(ChangeReqObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //console.log(result);
            $('#myModal').modal('hide');
            $('#AR_List').DataTable().ajax.reload();
            clearTextBox()

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {

    var ChangeReqObj = GetModel();
    ChangeReqObj.Tenant_ID = 13
    med.message_confirm(
        "Request " + /*$('#Name').val()*/  " " + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/ChangeRequest',
                    data: JSON.stringify(ChangeReqObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#AR_List').DataTable().ajax.reload();
                        clearTextBox()
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                    }
                });
            }
        }
    );
}
//Function for clearing the textboxes
function clearTextBox() {
    /*debugger*/;
    $('#Requestedby').val("");
    $('#Request').val("");
    $('#ID').val("");
    $('#ActionType').val(0);

    $('#Name').css('border-color', 'lightgrey');
    $('#Code').css('border-color', 'lightgrey');
}
//-- Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#Requestedby').val().trim() == "") {
        $('#Requestedby').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Requestedby').css('border-color', 'lightgrey');
    }
    if ($('#Request').val().trim() == "") {
        $('#Request').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Request').css('border-color', 'lightgrey');
    }

    if ($('#ActionType').val() == 0 || $('#ActionType').val() == null) {
        $('#ActionType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ActionType').css('border-color', 'lightgrey');
    }

    return isValid;
}

jQuery(document).ready(function () {

    initilizeDataTable.init();
    $("#AR_List_wrapper").css("width", "100%")

});
//creting Model object using jquery -- ishfaq
function GetModel() {

    debugger;
    var ChangeReqObj = {
        CR_ID: $('#ID').val(),

        CR_Requested_Description: $('#Request').val(),
        Tenant_ID: $('#Requestedby').val(),
        CR_Status_LOV_ID: $('#Status').val(),
        CR_Status: $('#Status').val(),
        CR_Requested_By: 1,
        CR_Requested_Action_LOV_ID: $('#ActionType').val(),
        CR_Remarks: $('#Remarks').val(), 

        //---Mandatory fields for each table
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    return ChangeReqObj;
}


function ActionButtionClick() {
    var title = $('#btnAction').text();

    if (title == 'Update') {
        //$('#btnAction').html('Update')
        $("#btnAction").text("Update"); 
        Update();
    }
    //else if (title == 'Delete') {
    //    $('#btnAction').html('Delete')
    //    Delete();
    //}
    //else if (title == "Save") {
    //    $('#btnAction').html('Save')
    //    Add();
    //}
}
