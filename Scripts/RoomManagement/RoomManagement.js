"use strict";
var table
var initilizeDataTable = function () {

    var initTable1 = function () {
        //debugger;

        table = $('#RoomList');

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
                //url:'http://localhost:50790/api/SpecialityClinicRoom',
                url: baseUrl + '/api/SpecialityClinicRoom/',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    return jsonData;
                }
            },

            columns: [
                { data: null, responsivePriority: 0 },
                { data: 'Speciality_Clinic_Description' },
                { data: 'Room_No' },
                { data: 'Room_Name' },
                { data: 'Room_Type' },
                { data: 'Entered_Date' },
                { data: 'Room_Status' },

            ],

            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 80,
                    className: 'dt-center',
                    render: function (data, type, full, meta) {
                        return `
                                 <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button"
                                     id="dropdownMenuButton" data-toggle="dropdown"
                                     aria-haspopup="true" aria-expanded="false"> Action
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Room_ID + `, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Room_ID +`, 'Delete');return false;"><i class="fa fa-trash"></i>Delete</a>
                                   </div>
                                </div>
                        `;
                    },
                },
                {
                    targets: 6,
                    render: function (data, type, full, meta) {
                        var status = {
                            A: { 'title': 'Active', 'class': ' kt-badge--success' },
                            I: { 'title': 'Inactive', 'class': ' kt-badge--danger' },
                            a: { 'title': 'Active', 'class': ' kt-badge--success' },
                            i: { 'title': 'Inactive', 'class': ' kt-badge--danger' },

                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="width:100px;" class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                        //return '<span  class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                }
            ],




        });

        $('#filterText').keyup(function () {
            table.DataTable().search($(this).val()).draw();
        });
    };
   
    return {
        //main function to initiate the module
        init: function () {
            initTable1();
        },
    };
}();




$("#btnAddRoom").click(function () {
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    Load_Combo_LOV("RoomType", "#RoomType","");

    openPopup(url, id, '', "Create");
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    var options = { "backdrop": "static", keyboard: true };
    var list = null;
    debugger;
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            debugger;
            $('#myModalContent').html(data);
            $('#myModal').modal(options);
            $('#myModal').modal('show');
            $("#Status option:first-child").attr("disabled", "disabled");

            if (flag == "Update" || flag == "Delete") {
                debugger;
                $('#btnAction').text(flag);
                //$("#ActionImage").toggleClass("fa fa-refresh");
               // $("#ActionImage").removeClass("fa-refresh");
                if (flag == "Delete") {
                    //$("#ActionImage").removeClass("fa-refresh")
                    //$("#ActionImage").removeClass("fa-save")

                  //  $("#ActionImage").toggleClass("fa-trash");

                    //$("#ActionImage").attr('class', 'fa fa-refresh');
                }
                $('#Start_time').empty();
                $('#End_time').empty();
                
                $('#exampleModalLabel').text("Update Room");
                $('#ID').val(row[0].Room_ID);
                $('#RoomNo').val(row[0].Room_No);
                $('#RoomName').val(row[0].Room_Name);
                $('#Start_time').val(row[0].Operation_Start_Time);
                $('#End_time').val(row[0].Operation_End_Time);
                debugger;
                Load_Specialty_Clinic(row[0].Speciality_Clinic_ID);
                Load_Combo_LOV("RoomType", "#RoomType", row[0].Room_Type_LOV_ID);

                $('#Status').val(row[0].Room_Status);
                Get_CheckedList('Update', row[0].Operation_Days);
               
            }
            else if (flag == "Delete") {
               
            }
            else {
                debugger;
                Load_Specialty_Clinic(0);
                Load_Combo_LOV("RoomType", "#RoomType", 0);
                $('#btnAction').html('Save');

                var dt = new Date();
                var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
               // var year = dt.getFullYear()
                $('#Start_time').val(time);
                $('#End_time').val(time);
                //$("#SpecialityClinic option:first-child").attr("disabled", "disabled");
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

    var RoomObj = GetModel();
    
    $.ajax({
        //url: 'http://localhost:50790/api/SpecialityClinicRoom',
        url: baseUrl + '/api/SpecialityClinicRoom/',
        data: JSON.stringify(RoomObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#RoomList').DataTable().ajax.reload();
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Room ID
function getbyID(ID, flag) {
    debugger;
    $.ajax({
        //url: 'http://localhost:50790/api/SpecialityClinicRoom',
        url: baseUrl + '/api/SpecialityClinicRoom/'+ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            //console.log(result)
            var url = $('#btnAddRoom').data('url');
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
    var RoomObj = GetModel();
    /*debugger*/;
    
    $.ajax({
        //url: 'http://localhost:50790/api/SpecialityClinicRoom',
        url: baseUrl + '/api/SpecialityClinicRoom/',
        data: JSON.stringify(RoomObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //console.log(result);
            $('#myModal').modal('hide');
            $('#RoomList').DataTable().ajax.reload();
            clearTextBox()

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    
    var RoomObj = GetModel();
    med.message_confirm(
        "Room " + $('#RoomName').val() + "will be deleted", 
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/SpecialityClinicRoom/',
                    //url: 'http://localhost:50790/api/SpecialityClinicRoom',
                    data: JSON.stringify(RoomObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#RoomList').DataTable().ajax.reload();
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
    $('#RoomNo').val("");
    $('#RoomName').val(""); ID
    $('#ID').val("");
    $('#RoomType').val("");
    $('#Status').val("");
    $('#SpecialityClinic').val("");

    //$('#btnUpdate').hide();
    //$('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $("#ActionImage").toggleClass("fa fa-save");
}
//Valdidation using jquery
function validate() {
    debugger;
    var isValid = true;
    if ($('#RoomNo').val().trim() == "") {
        $('#RoomNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoomNo').css('border-color', 'lightgrey');
    }
    if ($('#RoomName').val().trim() == "") {
        $('#RoomName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoomName').css('border-color', 'lightgrey');
    }

    if ($('#SpecialityClinic').val() == 0 || $('#SpecialityClinic').val() == null) {
        $('#SpecialityClinic').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SpecialityClinic').css('border-color', 'lightgrey');
    }

    if ($('#Status').val() == 0 || $('#Status').val() == null) {
        $('#Status').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Status').css('border-color', 'lightgrey');
    }
    
    if ($('#RoomType').val() == 0 || $('#RoomType').val()==null ) {
        $('#RoomType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoomType').css('border-color', 'lightgrey');
    }

    //var Operation_on_Days = $('input[name="day"]:checked').map(function () {
    //    return this.value;
    //}).get().join(",");

    if ($('input[name="day"]:checked').length == 0) {
        $("#label").css("color", "red");
        $('#label').addClass('focused');
        isValid = false;
    }
    else {
        $("#label").css("border-bottom-color", "none");
    }

    

    return isValid;
}

//binding check box using jquery--ishfaq
function Get_CheckedList(flag,data) {
    var favorite = [];
    var checked = null;
    
    if (flag == 'Update' || flag == 'Delete' ) {
        var list = data.split(',');
        for (var val = 0; val < list.length; val++) {
            var id = '#day' + list[val];
            $(id).prop("checked", true);
          //  $('input[type=checkbox][value=' + list[val] + ']').prop('checked', true);
        }
    }
    else if (flag == 'Create') {
        checked = $.each($("input[name='day']:checked"), function () {
            favorite.push($(this).val());
        }).join();
        //checked = favorite.join();
    }
    
    return checked;
}
// binding dropdown using jquery--ishfaq
function Load_Specialty_Clinic(ID) {
    var MyUrl = null;
    /*debugger*/;
    $.ajax({
        //url: 'http://localhost:50790/api/SpecialityClinicRoom',
        url: baseUrl + '/api/SpecialityClinic',
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (List) {
            //debugger;
            var len = List.length;

            $('#SpecialityClinic').empty();
            $('#SpecialityClinic').append($('<option disabled="disabled"></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = List[i]['Speciality_Clinic_ID'];
                var name = List[i]['Speciality_Clinic_Description'];
                $('#SpecialityClinic').append($('<option></option>').val(id).html(name));
            }
            if (ID != null) {
                //$("#SpecialityClinic").prop('selectedIndex', ID);
                $('#SpecialityClinic').val(ID);
            }
            else {
                $('#SpecialityClinic').val(0);
            }

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

//function Load_Room_Type(ID)
//{
//    /*debugger*/;
//    $.ajax({
//        //url: 'http://localhost:50790/api/lov/RoomType',
//        url: baseUrl + '/api/lov/RoomType',
//        type: "GET",
//        dataType: 'json',
//        contentType: 'application/json',
//        success: function (List) {
//            debugger;
//            var len = List.length;

//            $('#RoomType').empty();
//            $('#RoomType').append($('<option></option>').val(0).html("Choose One"));
//            for (var i = 0; i < len; i++) {
//                var id = List[i]['LOV_ID'];
//                var name = List[i]['LOV_Text'];
//                $('#RoomType').append($('<option></option>').val(id).html(name));
//            }
//            if (ID != null) {
//                $("#RoomType").prop('selectedIndex', ID);
//            }

//        },
//        error: function (errorThrown) {
//            console.log(errorThrown);
//        }
//    });
//}

jQuery(document).ready(function () {

    initilizeDataTable.init();
    $("#RoomList_wrapper").css("width", "100%")
  
});
//creting Model object using jquery -- ishfaq
function GetModel() {
    var Operation_on_Days = $('input[name="day"]:checked').map(function () {
        return this.value;
    }).get().join(",");

    var id = $('#Status').val();
    /*debugger*/;
    var RoomObj = {
        Room_ID: $('#ID').val(),
        Room_No: $('#RoomNo').val(),
        Room_Name: $('#RoomName').val(),
        Operation_Start_Time: $('#Start_time').val(),
        Operation_End_Time: $('#End_time').val(),
        Operation_Days: Operation_on_Days,
        Speciality_Clinic_ID: $('#SpecialityClinic').val(),
        Room_Type_LOV_ID: $('#RoomType').val(), 
        Room_Status: $('#Status').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Room_Status: "", //$('#chkActive').val(),
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    var id = $('#Status').val();
    RoomObj.Room_Status = $('#Status').val();
    return RoomObj;
}

function ActionButtionClick() {
    var title = $('#btnAction').text();

    if (title == 'Update') {
        Update();
    }
    else if (title == 'Delete') {
        Delete();
    }
    else if (title == "Save") {
        Add();
    }
}