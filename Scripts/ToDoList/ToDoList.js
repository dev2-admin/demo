"use strict";
var table;
var initilizeDataTable = function () {
    //debugger
    var initTable1 = function () {
        //debugger;
        table = $('#ToDoList');

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

                
                url: baseUrl + '/api/Todolist',
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
                { data: 'Todo_Task' },
                { data: 'Todotype' },
                { data: 'Reminder' },


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
                        return `
                                <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                     aria-haspopup="true" aria-expanded="false"> Action
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Todo_ID + `, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Todo_ID + `, 'Delete');return false;"><i class="fa fa-trash"></i>Delete</a>
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
            //debugger;
            initTable1();
        },

    };

}();

//-- Searching From Lists
$('#filterText').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});

//--Create new TodoList button click function to open Popup Model
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
        $("#Reminder option:first-child").attr("disabled", "disabled");
        $('#myModal').modal('show');

        debugger;
        if (flag == "Update" || flag == "Delete") {
            $('#ID').val(row[0].Todo_ID);
            $('#Task').val(row[0].Todo_Task);
            Load_Combo_LOV("TodoType", "#Type", row[0].Todo_Type_LOV_ID);
            Load_Combo_LOV("TodoReminder", "#Reminder", row[0].Todo_Reminder_LOV_ID);
            $('#btnAction').html(flag);
            $("#ActionImage").attr('class', 'fa fa-trash');

            if (flag == "Delete") {
                $("#ActionImage").attr('class', 'fa fa-refresh');
            }
        }
        else if (flag == "Delete") {
            debugger;

            //Get_CheckedList('Update', row[0].Operation_Days);
            //$('#btnAction').html('Delete');
        }
        else {
            Load_Combo_LOV("TodoType", "#Type", 0);
            Load_Combo_LOV("TodoReminder", "#Reminder", 0);

            //Load_Combo_Type("TodoType", "#Type", 0);
            //Load_Combo_Reminder("TodoReminder", "#Reminder", 0);
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

                $('#ID').val(row[0].Speciality_ID);
                $('#Task').val(row[0].Speciality_Code);
                $('#Type').val(row[0].Speciality_Code);
                $('#Reminder').val(row[0].Speciality_Name);
            /*debugger*/;
                if (flag == "Update" || flag == "Delete") {

                    $('#btnAction').html(flag);
                    $("#ActionImage").attr('class', 'fa fa-trash');

                    if (flag == "Delete") {
                        $("#ActionImage").attr('class', 'fa fa-refresh');
                    }
                    debugger;
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

                    //var dt = new Date();
                    //var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                    //$('#Start_time').val(time);
                    //$('#End_time').val(time);
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

    var TodolistObj = GetModel();

    $.ajax({
        url: baseUrl + '/api/Todolist',
        data: JSON.stringify(TodolistObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            setTimeout(function () {
                //debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#ToDoList').DataTable().ajax.reload();

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
        url: baseUrl + '/api/Todolist/' + ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            var url = $('#AddNew').data('url');
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
    var TodolistObj = GetModel();
    /*debugger*/;

    $.ajax({
        url: baseUrl + '/api/Todolist',
        data: JSON.stringify(TodolistObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');
            $('#ToDoList').DataTable().ajax.reload();
            clearTextBox()

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {

    var TodolistObj = GetModel();
    med.message_confirm(
        "Todolist " + $('#Task').val() + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/Todolist',
                    data: JSON.stringify(TodolistObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#ToDoList').DataTable().ajax.reload();
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
    //debugger;
    $('#Task').val("");
    $('#ID').val("");

    $('#Type').val(0);
    $('#Reminder').val(0);

    $('#Task').css('border-color', 'lightgrey');
    $('#Type').css('border-color', 'lightgrey');
    $('#Reminder').css('border-color', 'lightgrey');
}
//-- Valdidation using jquery
function validate() {
    
    var isValid = true;
    if ($('#Task').val().trim() == "") {
        $('#Task').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Task').css('border-color', 'lightgrey');
    }
    if ($('#Type').val() == 0 || $('#Type').val() == null) {
        $('#Type').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Type').css('border-color', 'lightgrey');
    }
    if ($('#Reminder').val() == 0 || $('#Reminder').val() == null) {
        $('#Reminder').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Reminder').css('border-color', 'lightgrey');
    }

    return isValid;
}

jQuery(document).ready(function () {

    initilizeDataTable.init();
    $("#ToDoList_wrapper").css("width", "100%")

});
//creting Model object using jquery -- ishfaq
function GetModel() {
   
    debugger;
    var ToDoListObj = {
        Todo_ID: $('#ID').val(),
        Todo_Task: $('#Task').val(),
        Todo_Type_LOV_ID: $('#Type').val(),
        Todo_Reminder_LOV_ID: $('#Reminder').val(),
        
        Tenant_ID: 13,
        User_ID:1,

        //---Mandatory fields for each table
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    return ToDoListObj;
}

function ActionButtionClick() {
    var title = $('#btnAction').text();

    if (title == 'Update') {
        $('#btnAction').html('Update')
        Update();
    }
    else if (title == 'Delete') {
        $('#btnAction').html('Delete')
        Delete();
    }
    else if (title == "Save") {
        $('#btnAction').html('Save')
        Add();
    }
}
