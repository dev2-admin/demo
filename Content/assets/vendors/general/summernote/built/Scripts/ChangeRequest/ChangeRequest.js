"use strict";
var table;
var initilizeDataTable = function () {
    var initTable1 = function () {
        table = $('#ChangeRequestList');
        /*debugger*/ ;
        table.DataTable({
            responsive: true,
            dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
            lengthMenu: [5, 10, 25, 50],
            pageLength: 5,
            language: {
                'lengthMenu': 'Display _MENU_'
            },
            // Order settings
            order: [[1, 'desc']],
            ajax: {
                //url: baseUrl + '/api/ChangeRequest',
                url: baseUrl + '/api/ChangeRequest/Dynamic/CR',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
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
                        console.log(data);
                        return "\n                                <div class=\"dropdown\">\n                                  <button class=\"btn btn-outline-brand dropdown-toggle\" type=\"button\"\n                                     id=\"dropdownMenuButton\" data-toggle=\"dropdown\"\n                                     aria-haspopup=\"true\" aria-expanded=\"false\"> Action\n                                  </button>\n                                  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                    <a class=\"dropdown-item\" href=\"#\" onClick=\"getbyID(" + data.CR_ID + ", 'Update');return false;\" ><i class=\"fa fa-edit\"></i> Edit</a>\n                                    <a class=\"dropdown-item\" href=\"#\" onClick=\"getbyID(" + data.CR_ID + ", 'Delete');return false;\"><i class=\"fa fa-trash\"></i>Delete</a>\n                                   </div>\n                                </div>\n                        ";
                    }
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
                            Completed: { 'title': 'Completed', 'class': ' kt-badge--success' }
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="width:100px;" class="kt-badge ' + status[data]["class"] + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    }
                }
            ]
        });
    };
    return {
        //main function to initiate the module
        init: function () {
            initTable1();
        }
    };
}();
$('#filterText').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});
//--Create new Speciality button click function to open Popup Model
$(function () {
    /*debugger*/ ;
    $("#AddNew").click(function () {
        clearTextBox();
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
    Load_Combo_LOV("CR_Status", "#Status", 0);
    $('#Status').attr('disabled', true);
    $("#Status option:first-child").attr("disabled", "disabled");
    $("#ActionType option:first-child").attr("disabled", "disabled");
    if (url == undefined || url == "" || url == null) {
        $('#myModal').modal('show');
        //debugger;
        if (flag == "Update" || flag == "Delete") {
            $('#ID').val(row[0].CR_ID);
            $('#Requestedby').val(row[0].Tenant_Desc);
            $('#Request').val(row[0].CR_Requested_Description);
            Load_Combo_LOV("CR_RequestAction", "#ActionType", row[0].CR_Requested_Action_LOV_ID);
            $('#Status').attr('disabled', true);
            //Load_Combo_LOV("CR_Status", "#Status", row[0].CR_Requested_Action_LOV_ID);
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
            //debugger;
            Load_Combo_LOV("CR_RequestAction", "#ActionType", 0);
            Load_Combo_LOV("CR_Status", "#Status", 302);
            $('#Status').attr('disabled', true);
            $('#btnAction').html('Save');
        }
    }
    else {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#myModalContent').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');
                /*debugger*/ ;
                if (flag == "Update" || flag == "Delete") {
                    $('#btnAction').html(flag);
                    $("#ActionImage").attr('class', 'fa fa-trash');
                    if (flag == "Delete") {
                        $("#ActionImage").attr('class', 'fa fa-refresh');
                    }
                    //debugger;
                    //$('#ID').val(result[0].Speciality_ID);
                    //$('#Name').val(result[0].Speciality_Name);
                    //$('#Code').val(result[0].Speciality_Code);
                }
                else if (flag == "Delete") {
                    debugger;
                    //Get_CheckedList('Update', row[0].Operation_Days);
                    //$('#btnAction').html('Delete');
                }
                else {
                    //Load_Combo_LOV("RoomType", "#RoomType", "");
                    $('#btnAction').html('Save');
                }
            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });
    }
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
                med.notify_info("Record Saved Successfully.");
            });
            $('#ChangeRequestList').DataTable().ajax.reload();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon ID
function getbyID(ID, flag) {
    //debugger;
    $.ajax({
        url: baseUrl + '/api/ChangeRequest/' + ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            var url = $('#CreateSpeciality').data('url');
            openPopup(url, '', result, flag);
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
    ChangeReqObj.Tenant_ID = 13;
    $.ajax({
        url: baseUrl + '/api/ChangeRequest',
        data: JSON.stringify(ChangeReqObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result);
            $('#myModal').modal('hide');
            $('#ChangeRequestList').DataTable().ajax.reload();
            clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    var ChangeReqObj = GetModel();
    ChangeReqObj.Tenant_ID = 13;
    med.message_confirm("Request " + /*$('#Name').val()*/ " " + "will be deleted", "Are You Sure", function (isConfirmed) {
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
                    $('#ChangeRequestList').DataTable().ajax.reload();
                    clearTextBox();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}
//Function for clearing the textboxes
function clearTextBox() {
    /*debugger*/ ;
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
    $("#ChangeRequestList_wrapper").css("width", "100%");
});
//creting Model object using jquery -- ishfaq
function GetModel() {
    debugger;
    var ChangeReqObj = {
        CR_ID: $('#ID').val(),
        CR_Requested_Description: $('#Request').val(),
        Tenant_ID: $('#Requestedby').val(),
        //CR_Requested_Action_LOV_ID: $('#ActionType option:selected').text(),
        CR_Status_LOV_ID: 302,
        CR_Status: 302,
        CR_Requested_By: 1,
        CR_Requested_Action_LOV_ID: $('#ActionType').val(),
        CR_Remarks: "",
        //---Mandatory fields for each table
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    return ChangeReqObj;
}
//function Load_Specialty(ID) {
//    debugger;
//    var MyUrl = null;
//    $.ajax({
//        url: baseUrl + "/api/Speciality",
//        type: "GET",
//        dataType: 'json',
//        contentType: 'application/json',
//        //  data: JSON.stringify(provinceName),
//        success: function (response) {
//            //debugger;
//            var len = response.length;
//            $('#Speiality').empty();
//            $('#Speiality').append($('<option></option>').val("Choose One").html("Choose One"));
//            for (var i = 0; i < len; i++) {
//                var id = response[i]['Speciality_ID'];
//                var name = response[i]['Speciality_Name'];
//                $('#Speiality').append($('<option></option>').val(id).html(name));
//                //$("#Speiality").append("<option value='" + id + "'>" + name + "</option>");
//            }
//            if (ID != null) {
//                $("#Speiality").prop('selectedIndex', ID - 1);
//                //$("#Speiality")[0].selectedIndex = ID;
//            }
//        },
//        error: function (errorThrown) {
//            console.log(errorThrown);
//        }
//    });
//}
function ActionButtionClick() {
    var title = $('#btnAction').text();
    if (title == 'Update') {
        $('#btnAction').html('Update');
        Update();
    }
    else if (title == 'Delete') {
        $('#btnAction').html('Delete');
        Delete();
    }
    else if (title == "Save") {
        $('#btnAction').html('Save');
        Add();
    }
}
//# sourceMappingURL=ChangeRequest.js.map