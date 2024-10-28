"use strict";
var table;
var initilizeDataTable = function () {
    debugger;
    var initTable1 = function () {
        debugger;
        table = $('#SpecialityList');

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

                //url: 'http://localhost:50790/api/Speciality',
                url: baseUrl + '/api/Speciality',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (json) {
                    debugger;
                    return json;
                }
            },


            columns: [
                { data: null, responsivePriority: 0 },
                //{ data: 'Speciality_ID' },
                { data: 'Speciality_Name' },
                { data: 'Speciality_Code' },


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
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_ID + `, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_ID + `, 'Delete');return false;"><i class="fa fa-trash"></i>Delete</a>
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
            debugger;
            initTable1();
        },

    };

}();

//-- Searching from List
$('#filterText').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});

//--Create new Speciality button click function to open Popup Model
$(function () {
    debugger;
    $("#CreateSpeciality").click(function () {
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
    clearTextBox();
    debugger;
    if (url == undefined || url == "" || url == null) {

        $('#ID').val(row[0].Speciality_ID);
        $('#Name').val(row[0].Speciality_Name);
        $('#Code').val(row[0].Speciality_Code);
        $('#myModal').modal('show');
        debugger;
        if (flag == "Update" || flag == "Delete") {

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

            //Load_Combo_LOV("RoomType", "#RoomType", "");
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

            /*debugger*/;
                if (flag == "Update" || flag == "Delete") {

                    $('#btnAction').html(flag);
                    $("#ActionImage").attr('class', 'fa fa-trash');

                    if (flag == "Delete") {
                        $("#ActionImage").attr('class', 'fa fa-refresh');
                    }
                    debugger;
                    $('#ID').val(result[0].Speciality_ID);
                    $('#Name').val(result[0].Speciality_Name);
                    $('#Code').val(result[0].Speciality_Code);

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

    var SpecialityObj = GetModel();

    $.ajax({
        url: baseUrl + '/api/Speciality',
        data: JSON.stringify(SpecialityObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#SpecialityList').DataTable().ajax.reload();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon ID
function getbyID(ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/Speciality/' + ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            var url = $('#CreateSpeciality').data('url');
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
    var SpecialityObj = GetModel();
    /*debugger*/;

    $.ajax({
        url: baseUrl + '/api/Speciality',
        data: JSON.stringify(SpecialityObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');
            $('#SpecialityList').DataTable().ajax.reload();
            clearTextBox()

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {

    var SpecialityObj = GetModel();
    med.message_confirm(
        "Speciality " + $('#Name').val() + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/Speciality',
                    data: JSON.stringify(SpecialityObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#SpecialityList').DataTable().ajax.reload();
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
    debugger;
    $('#Name').val("");
    $('#Code').val("");
    $('#ID').val("");
   
    $('#Name').css('border-color', 'lightgrey');
    $('#AgCodee').css('border-color', 'lightgrey');
}
//-- Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Code').val().trim() == "") {
        $('#Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Code').css('border-color', 'lightgrey');
    }

    return isValid;
}

jQuery(document).ready(function () {

    initilizeDataTable.init();
    $("#SpecialityList_wrapper").css("width", "100%")

});
//creting Model object using jquery -- ishfaq
function GetModel() {
    //var SpecialityDropdown = $('input[name="day"]:checked').map(function () {
    //    return this.value;
    //}).get().join(",");
    debugger;
    var SpecialityObj = {
        Speciality_ID: $('#ID').val(),
        Speciality_Code: $('#Code').val(),
        Speciality_Name: $('#Name').val(),

        //---Mandatory fields for each table
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    return SpecialityObj;
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