"use strict";
var table;
var initilizeDataTable = function () {
    //debugger
    var QL_Table = function () {
        //debugger;
        table = $('#QuickLinksList');
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
                url: baseUrl + '/api/QuickLinks',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (json) {
                    //debugger;
                    return json;
                }
            },
            columns: [
                { data: null, responsivePriority: 0 },
                { data: 'QL_URL' },
                { data: 'QL_Type' },
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
                        return "\n                                <div class=\"dropdown\">\n                                  <button class=\"btn btn-outline-brand dropdown-toggle\" type=\"button\"\n                                     id=\"dropdownMenuButton\" data-toggle=\"dropdown\"\n                                     aria-haspopup=\"true\" aria-expanded=\"false\"> Action\n                                  </button>\n                                  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                    <a class=\"dropdown-item\" href=\"#\" onClick=\"getbyID(" + data.QL_ID + ", 'Update');return false;\" ><i class=\"fa fa-edit\"></i> Edit</a>\n                                    <a class=\"dropdown-item\" href=\"#\" onClick=\"getbyID(" + data.QL_ID + ", 'Delete');return false;\"><i class=\"fa fa-trash\"></i>Delete</a>\n                                   </div>\n                                </div>\n                        ";
                    }
                },
            ]
        });
    };
    return {
        //main function to initiate the module
        init: function () {
            QL_Table();
        }
    };
}();
//--- Searching from list
$('#filterText').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});
//--Create new QuickLinks button click function to open Popup Model
$(function () {
    //debugger;
    $("#AddNew").click(function () {
        clearTextBox();
        var $buttonClicked = $(this);
        var url = $(this).data('url');
        var id = $buttonClicked.attr('data-id');
        openPopup(url, id, '', "Create");
    });
    //clearTextBox();
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    var options = { "backdrop": "static", keyboard: true };
    clearTextBox();
    //debugger;
    if (url == undefined || url == "" || url == null) {
        $("#Type option:first-child").attr("disabled", "disabled");
        $('#myModal').modal('show');
        debugger;
        if (flag == "Update" || flag == "Delete") {
            $('#ID').val(row[0].QL_ID);
            $('#Url').val(row[0].QL_URL);
            Load_Combo_LOV("QuickLinkType", "#LinkType", row[0].QL_Type_LOV_ID);
            $('#btnAction').html(flag);
            $("#ActionImage").attr('class', 'fa fa-trash');
            if (flag == "Delete") {
                $("#ActionImage").attr('class', 'fa fa-refresh');
            }
        }
        else if (flag == "Delete") {
            debugger;
        }
        else {
            Load_Combo_LOV("QuickLinkType", "#LinkType", 0);
            $('#btnAction').html('Save');
            //var dt = new Date();
            //var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            //$('#Start_time').val(time);
            //$('#End_time').val(time);
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
                }
                else if (flag == "Delete") {
                }
                else {
                    Load_Combo_LOV("QuickLinkType", "#Type", "");
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
    var QuickLinksObj = GetModel();
    $.ajax({
        url: baseUrl + '/api/QuickLinks',
        data: JSON.stringify(QuickLinksObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');
            setTimeout(function () {
                //debugger;
                med.notify_info("Record Saved Successfully.");
            });
            $('#QuickLinksList').DataTable().ajax.reload();
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
        url: baseUrl + '/api/QuickLinks/' + ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            var url = $('#AddNew').data('url');
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
    var QuickLinksObj = GetModel();
    /*debugger*/ ;
    $.ajax({
        url: baseUrl + '/api/QuickLinks',
        data: JSON.stringify(QuickLinksObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            $('#myModal').modal('hide');
            $('#QuickLinksList').DataTable().ajax.reload();
            clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    var QuickLinksObj = GetModel();
    med.message_confirm("Quick Link " + $('#Url').val() + "will be deleted", "Are You Sure", function (isConfirmed) {
        if (isConfirmed) {
            $.ajax({
                url: baseUrl + '/api/QuickLinks',
                data: JSON.stringify(QuickLinksObj),
                type: "DELETE",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    $('#myModal').modal('hide');
                    //initilizeDataTable.init();
                    $('#QuickLinksList').DataTable().ajax.reload();
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
    //debugger;
    $('#Url').val("");
    $('#ID').val("");
    $('#LinkType').val(0);
    $('#Url').css('border-color', 'lightgrey');
    $('#LinkType').css('border-color', 'lightgrey');
}
//-- Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Url').val().trim() == "") {
        $('#Url').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Url').css('border-color', 'lightgrey');
    }
    if ($('#LinkType').val() == 0 || $('#LinkType').val() == null) {
        $('#LinkType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LinkType').css('border-color', 'lightgrey');
    }
    return isValid;
}
jQuery(document).ready(function () {
    initilizeDataTable.init();
    $("#QuickLinksList_wrapper").css("width", "100%");
});
//creating Model object using jquery -- ishfaq
function GetModel() {
    debugger;
    var QuickLinksObj = {
        QL_ID: $('#ID').val(),
        QL_URL: $('#Url').val(),
        QL_Type_LOV_ID: $('#LinkType').val(),
        Tenant_ID: 13,
        User_ID: 1,
        //---Mandatory fields for each table
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    return QuickLinksObj;
}
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
//# sourceMappingURL=QuickLinks.js.map