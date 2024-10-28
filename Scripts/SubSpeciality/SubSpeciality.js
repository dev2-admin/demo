
"use strict";
var initilizeSubSpeciality = function () {
    //debugger;
    var initSubSpeciality = function () {
        //debugger;
        var table = $('#SubSpeciality');

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
                url: baseUrl + "/api/SubSpeciality",

      
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
                { data: 'Sub_Speciality_Name' },
                { data: 'Sub_Speciality_Code' },


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
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Sub_Speciality_ID + `, 'Update');return false;" ><i class="fa fa-edit"></i> Edit</a>
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Sub_Speciality_ID + `, 'Delete');return false;"><i class="fa fa-trash"></i>Delete</a>
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
            initSubSpeciality();
        },

    };

}();






$(function () {
    //debugger;
    $("#CreateSpeciality").click(function () {
        var $buttonClicked = $(this);
        var url = $(this).data('url');
        var id = $buttonClicked.attr('data-id');
        openPopup(url, id,'');
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
        clearTextBox();
    });
};
//Refreshing Data
$("#btnClose").click(function () {
    $('#myModal').modal('hide');
    //document.location.reload();
});
//Add Data Function
function Add() {
    debugger
    var $buttonClicked = $('#CreateSubSpeciality');
    var url = $buttonClicked.data('url');
    var res = validate();
    if (res == false) {
        return false;
    }

    var ObjSpeciality = {
        Sub_Speciality_ID: $('#ID').val(),
        Sub_Speciality_Name: $('#Name').val(),
        Sub_Speciality_Code: $('#Code').val(),

        Speciality_ID: $('#Speiality').val(),
        Speciality_Name: $('#Speiality option:selected').text(),
        
        Entered_Date: new Date($.now()),
        Entered_By: $('#EnteredBy').val(),
        //Tenant_Active: $('#chkActive').val(),
        Audit_Date: new Date($.now())
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: "http://localhost:50790/api/SubSpeciality",
        data: JSON.stringify(ObjSpeciality),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');
            initilizeSubSpeciality.init();
            $("#SubSpeciality_wrapper").css("width", "100%")
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(ID,flag) {
    //debugger;
   
    $.ajax({
        url: 'http://localhost:50790/api/SubSpeciality/' + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            Load_Specialty(result[0].Speciality_ID);
            $('#ID').val(result[0].Sub_Speciality_ID);
            $('#Name').val(result[0].Sub_Speciality_Name);
            $('#Code').val(result[0].Sub_Speciality_Code);
            $('#EnteredDate').val(result[0].Entered_Date);
            $('#AuditDate').val(result[0].Audit_Date);

            
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
        Sub_Speciality_ID: $('#ID').val(),
        Sub_Speciality_Name: $('#Name').val(),
        Sub_Speciality_Code: $('#Code').val(),
        Speciality_ID: $('#Speiality').val(),
        Speciality_Name: $('#Speiality option:selected').text(),
        Entered_Date: new Date($.now()),
        Audit_Date: new Date($.now())
        
    };
    $.ajax({
        //url: "/Home/Update",
        url: 'http://localhost:50790/api/SubSpeciality',
        data: JSON.stringify(ObjSpeciality),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $("#myModal").reload();
            $('#myModal').modal('hide');
            $('#Name').val("");
            $('#Code').val("");
            $('#SubSpeciality').DataTable().ajax.reload();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete() {
    // var ans = confirm("Are you sure you want to delete this Record?");
    var ObjSpeciality = {

        Sub_Speciality_ID: $('#ID').val(),
        Sub_Speciality_Name: $('#Name').val(),
        Sub_Speciality_Code: $('#Code').val(),
        Speciality_ID: $('#Speiality').val(),
        Speciality_Name: $('#Speiality option:selected').text(),
        Entered_Date: new Date($.now()),
        Audit_Date: new Date($.now()),
        Entered_By: 2,
        Audit_By: 3
    };
    med.message_confirm(
        "Sub Speciality " + $('#Name').val() + " will be deleted permanently",
        "Are You Sure ?",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    //url: baseUrl + '/api/tenant/',
                    url: 'http://localhost:50790/api/SubSpeciality',
                    data: JSON.stringify(ObjSpeciality),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        $('#SubSpeciality').DataTable().ajax.reload();
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
    $("#Speiality").prop('selectedIndex', 0);
    //$('#myModal').on('hidden', function () {
    //    document.location.reload();
    //})
    $('#SubSpeciality').DataTable().ajax.reload();
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

//---Binding Dropdwon
function Load_Specialty(ID) {
    //debugger;
    var MyUrl = null;
    
    $.ajax({
        url: baseUrl + "/api/Speciality",
   
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        //  data: JSON.stringify(provinceName),
        success: function (response) {
            //debugger;
            var len = response.length;

            $('#Speiality').empty();
            $('#Speiality').append($('<option></option>').val("Choose One").html("Choose One"));
            $("#Speiality option:first-child").attr("disabled", "disabled");
            for (var i = 0; i < len; i++) {
                var id = response[i]['Speciality_ID'];
                var name = response[i]['Speciality_Name'];
                $('#Speiality').append($('<option></option>').val(id).html(name));
                //$("#Speiality").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (ID != null) {
                $("#Speiality").prop('selectedIndex', ID-1);
                //$("#Speiality")[0].selectedIndex = ID;
            }

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

jQuery(document).ready(function () {

    initilizeSubSpeciality.init();
    $("#SubSpeciality_wrapper").css("width", "100%");
    Load_Specialty()

});