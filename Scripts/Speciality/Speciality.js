"use strict";
var table;
var initilizeDataTable = function () {
    var initTable1 = function () {
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
                
                url: 'http://localhost:50790/api/Speciality',
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
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_ID +`, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_ID +`, 'Delete');return false;"><i class="fa fa-trash"></i>Delete</a>
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

//-- Searching From Lists
$('#filterText').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});

jQuery(document).ready(function () {

    initilizeDataTable.init();
    $("#SpecialityList_wrapper").css("width", "100%")

});

$(function () {
    debugger;
    $("#CreateSpeciality").click(function () {
        var $buttonClicked = $(this);
        var url = $(this).data('url');
        var id = $buttonClicked.attr('data-id');
        openPopup(url, id);
    });
});


var openPopup = function (url, id, row) {
    debugger;
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: { "Id": id },
        datatype: "json",
        success: function (data) {
            $('#myModalContent').html(data);
            $('#myModal').modal(options);
            $('#myModal').modal('show');

        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });

    $("#closbtn").click(function () {
        $('#myModal').modal('hide');
    });
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

    var ObjSpeciality = {
        Speciality_ID: $('#Speciality_ID').val(),
        Speciality_Code: $('#Code').val(),
        Speciality_Name: $('#Name').val(),
        Entered_Date: new Date($.now()),
        Entered_By: $('#EnteredBy').val(),
        Audit_Date: new Date($.now())
    };
    
    $.ajax({
        url: "http://localhost:50790/api/Speciality",
        data: JSON.stringify(ObjSpeciality),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');
            initilizeDataTable.init();
            $("#SpecialityList_wrapper").css("width", "100%")
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(ID, flag) {
    debugger;
    $('#Code').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    //$('#State').css('border-color', 'lightgrey');
    //$('#Country').css('border-color', 'lightgrey');
    $.ajax({
        //url: "/Home/getbyID/" + EmpID,
        url: 'http://localhost:50790/api/Speciality/'+ ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ID').val(result[0].Speciality_ID);
            $('#Name').val(result[0].Speciality_Name);
            $('#Code').val(result[0].Speciality_Code);
           
            $('#myModal').modal('show');
           
            if (flag == "Update") {
                $('#btnAction').html('Update');
            }
            if (flag == "Delete") {
                $('#btnAction').html('Delete');
            }
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
    return false;
}
//function for updating employee's record
function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    var ObjSpeciality = {
        Speciality_ID: $('#ID').val(),
        Speciality_Name: $('#Name').val(),
        Speciality_Code: $('#Code').val(),
        Entered_Date: new Date($.now()),
        Audit_Date: new Date($.now())
    };
    $.ajax({
        //url: "/Home/Update",
        url: 'http://localhost:50790/api/Speciality',
        data: JSON.stringify(ObjSpeciality),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            //$('#EmployeeID').val("");
            $('#Name').val("");
            $('#Code').val("");
            //$('#State').val("");
            //$('#Country').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    // var ans = confirm("Are you sure you want to delete this Record?");
    var ObjSpeciality = {

        Speciality_ID: $('#ID').val(),
        Speciality_Name: $('#Name').val(),
        Speciality_Code: $('#Code').val(),
        Entered_Date: new Date($.now()),
        Audit_Date: new Date($.now()),
        Entered_By: 2,
        Audit_By: 3
    };
    med.message_confirm(
        "Speciality " + $('#Name').val() + " will be deleted permanently",
        "Are You Sure ?",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    //url: baseUrl + '/api/tenant/',
                    url: 'http://localhost:50790/api/Speciality',
                    data: JSON.stringify(ObjSpeciality),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        $('#SpecialityList').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                    }
                });
            }
        }
    );
}


//function Delete() {
//    debugger;
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var ObjSpeciality = {
//        Speciality_ID: $('#ID').val(),
//        Speciality_Name: $('#Name').val(),
//        Speciality_Code: $('#Code').val(),
//        //State: $('#State').val(),
//        //Country: $('#Country').val(),
//    };

//    var ans = confirm("Are you sure you want to delete this Record?");
//    if (ans) {
//        $.ajax({
//            //url: "/Home/Update",
//            url: 'http://localhost:50790/api/Speciality',
//            data: JSON.stringify(ObjSpeciality),
//            type: "DELETE",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                loadData();
//                $('#myModal').modal('hide');
//                //$('#EmployeeID').val("");
//                $('#Name').val("");
//                $('#Code').val("");
//                //$('#State').val("");
//                //$('#Country').val("");
//            },
//            error: function (errormessage) {
//                alert(errormessage.responseText);
//            }
//        });
//    }
//    //if (ans) {
//        //$.ajax({
           
//        //    url: 'http://localhost:50790/api/Speciality/' + ID,
//        //    //url: "/Home/Delete/" + ID,
//        //    type: "DELETE",
//        //    contentType: "application/json;charset=UTF-8",
//        //    dataType: "json",
//        //    success: function (result) {
//        //        loadData();
//        //    },
//        //    error: function (errormessage) {
//        //        alert(errormessage.responseText);
//        //    }
//        //});
//    }
//Function for clearing the textboxes
function clearTextBox() {
    $('#Name').val("");
    $('#Code').val("");
    $('#ID').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Code').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
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

function ActionButtionClick() {
    debugger;

    var title = $('#btnAction').text();
    //var $buttonClicked = $('#btnAction').val();

    if (title == 'Update') {
        debugger;
        Update();

    }
    else if (title == 'Delete') {
        Delete();
    }
    else if (title == "Save") {
        debugger;
        Add();
    }


}

$("#btnClose").click(function () {
    $('#myModal').modal('hide');
    document.location.reload();
});