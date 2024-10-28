


var SpecialityClinicTable = function () {

    var initTable1 = function () {
        var table = $('#SpecialityClinic');

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

            // Order settings
            order: [[1, 'desc']],

            ajax: {
                url: baseUrl + '/api/SpecialityClinic',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    debugger;
                    return jsonData;
                },
                error: function (errormessage) {
                    console.log(errormessage.responseText);

                }
            },


            columns: [
                { data: null, responsivePriority: 0 },
                { data: 'Speciality_Clinic_ID' },
                { data: 'Hospital_Description' },
                { data: 'Speciality_Clinic_Code' },
                { data: 'Speciality_Clinic_Description' },
                { data: 'Speciality_Name' },
                { data: 'Speciality_Clinic_Incharge' },
                { data: 'Entered_Date' },
                { data: 'Entered_By' },

                //<th>
                //    Hospital
                //        </th>
                //<th>
                //    Code
                //        </th>
                //<th>
                //    Description
                //        </th>
                //<th>
                //    Speciality
                //        </th>
                //<th>
                //    Incharge
                //        </th>
                //<th>
                //    Entered Date
                //        </th>
                //<th>
                //    Entered By
                //        </th>


            ],
            columnDefs: [

                {
                    targets: 1,
                    title: 'Speciality_Clinic_ID',
                    orderable: false,
                    visible: false
                },
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100,
                    class: 'dt-center',
                    render: function (data, type, full, meta) {
                        return `<div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                   <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_Clinic_ID + `, 'Update');return false;"><i class="fa fa-edit"></i> Edit</a>                         
                                   <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Speciality_Clinic_ID +`, 'Delete');return false;"><i class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div> `;
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

jQuery(document).ready(function () {
    SpecialityClinicTable.init();
});



function Load_Combo_Speciality(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Speciality",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Speciality_ID').empty();
            $('#Speciality_ID').append($('<option></option>').val(0).html("Choose One"));
            $("#Speciality_ID option:first-child").attr("disabled", "disabled");
            for (var i = 0; i < len; i++) {
                var id = response[i]['Speciality_ID'];
                var name = response[i]['Speciality_Name'];

                $("#Speciality_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined || seletedValue != null || seletedValue != "") {

                $('#Speciality_ID').val(seletedValue);
            }
            else {
                $('#Speciality_ID').val(0);
            }
        },

        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function Load_Combo_Sub_Speciality(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/SubSpeciality",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Sub_Speciality_ID').empty();
            $('#Sub_Speciality_ID').append($('<option></option>').val(0).html("Choose One"));
            $("#Sub_Speciality_ID option:first-child").attr("disabled", "disabled");
            for (var i = 0; i < len; i++) {
                var id = response[i]['Sub_Speciality_ID'];
                var name = response[i]['Sub_Speciality_Name'];

                $("#Sub_Speciality_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined || seletedValue != null || seletedValue != "") {

                $('#Sub_Speciality_ID').val(seletedValue);
            }
            else {
                $('#Sub_Speciality_ID').val(0);
            }
        },

        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function Load_Combo_Hospital(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/HospitalSetup",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Hospital_ID').empty();
            $('#Hospital_ID').append($('<option></option>').val(0).html("Choose One"));
            $("#Hospital_ID option:first-child").attr("disabled", "disabled");
            for (var i = 0; i < len; i++) {
                var id = response[i]['Hospital_ID'];
                var name = response[i]['Hospital_Description'];

                $("#Hospital_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined || seletedValue != null || seletedValue != "" ) {

                $('#Hospital_ID').val(seletedValue);
            }
            else {
                $('#Hospital_ID').val(0);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

$("#Create").click(function () {
    debugger;
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    Load_Combo_Speciality(0);
    Load_Combo_Sub_Speciality(0);
    Load_Combo_Hospital(0);
    Load_Combo_LOV("ContactType", "#Contact_Type_LOV_ID",0);
    openPopup(url, id, '', "Create","");
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    debugger;
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
                $('#Update').show();
                $('#exampleModalLabel').text("Update Speciality Clinic");

               
            }
            else if (flag == "Create") {
                $('#Delete').hide();
                $('#Update').hide();
                $('#SaveChanges').show();
                $('#exampleModalLabel').text("Create Speciality Clinic");
            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#Delete').show();
                $('#exampleModalLabel').text("Delete Speciality Clinic");

              
            }

            if (flag == "Update" || flag == "Delete") {
                debugger;
                Load_Combo_Speciality(row[0].Speciality_ID);
                Load_Combo_Sub_Speciality(row[0].Sub_Speciality_ID);
                Load_Combo_Hospital(row[0].Hospital_ID);
                Load_Combo_LOV("ContactType", "#Contact_Type_LOV_ID", row[0].Contact_Type_LOV_ID);
                $('#Hospital_ID').val(row[0].Hospital_ID),
                $('#Tenant_ID').val(row[0].Tenant_ID);
                $('#Speciality_Clinic_ID').val(row[0].Speciality_Clinic_ID),

                $('#Speciality_Clinic_Detail').val(row[0].Speciality_Clinic_Detail);
                $('#Speciality_Clinic_Description').val(row[0].Speciality_Clinic_Description);
                $('#Speciality_Clinic_Code').val(row[0].Speciality_Clinic_Code);
                $('#Speciality_Clinic_Incharge').val(row[0].Speciality_Clinic_Incharge);
              //  $('#Speciality_ID').val(row[0].Speciality_ID);
                //$('#Sub_Speciality_ID').val(row[0].Sub_Speciality_ID);
                $('#Speciality_Clinic_Contact').val(row[0].Speciality_Clinic_Contact);
                $('#Speciality_Clinic_Email').val(row[0].Speciality_Clinic_Email);
                $('#Speciality_Clinic_Start_Time').val(row[0].Speciality_Clinic_Start_Time);
                $('#Speciality_Clinic_End_Time').val(row[0].Speciality_Clinic_End_Time);
                $('#Speciality_Clinic_Contact').val(row[0].Speciality_Clinic_Contact);
                $('#Speciality_Clinic_Email').val(row[0].Speciality_Clinic_Email);
               // $('#Contact_Type_LOV_ID').val(row[0].Contact_Type_LOV_ID)
                SetNGetCheckbox("Get", row[0].Speciality_Clinic_Off_Days);
            
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
    var  Speciality_Clinic_Off_Days = SetNGetCheckbox("Create","");
    var dataObj = {
       // Speciality_Clinic_ID: $('#Speciality_Clinic_ID').val(),
        Tenant_ID: 13,//$('#Tenant_ID').val(),
        Hospital_ID: $('#Hospital_ID').val(),
        Speciality_Clinic_Detail: $('#Speciality_Clinic_Detail').val(),
        Speciality_Clinic_Description: $('#Speciality_Clinic_Description').val(),
        Speciality_Clinic_Code: $('#Speciality_Clinic_Code').val(),
        Speciality_Clinic_Incharge: $('#Speciality_Clinic_Incharge').val(),
        Speciality_ID: $('#Speciality_ID').val(),
        Sub_Speciality_ID: $('#Sub_Speciality_ID').val(),
        Speciality_Clinic_Start_Time: $('#Speciality_Clinic_Start_Time').val(),
        Speciality_Clinic_End_Time: $('#Speciality_Clinic_End_Time').val(),
        Speciality_Clinic_Off_Days: Speciality_Clinic_Off_Days,
        Speciality_Clinic_Contact: $('#Speciality_Clinic_Contact').val(),
        Speciality_Clinic_Email: $('#Speciality_Clinic_Email').val(),
        Contact_Type_LOV_ID: $('#Contact_Type_LOV_ID').val(),

        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    $.ajax({
        url: baseUrl + '/api/SpecialityClinic',
        data: JSON.stringify(dataObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#SpecialityClinic').DataTable().ajax.reload();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(Speciality_Clinic_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/SpecialityClinic/' + Speciality_Clinic_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#Create').data('url');
         
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

    var Speciality_Clinic_Off_Days = SetNGetCheckbox("Create","");
    var dataObj = {
        Speciality_Clinic_ID: $('#Speciality_Clinic_ID').val(),
        Tenant_ID:$('#Tenant_ID').val(),
        Hospital_ID:$('#Hospital_ID').val(),
        Speciality_Clinic_Description: $('#Speciality_Clinic_Description').val(), 
        Speciality_Clinic_Detail: $('#Speciality_Clinic_Detail').val(),
        Speciality_Clinic_Code:$('#Speciality_Clinic_Code').val(),
        Speciality_Clinic_Incharge:$('#Speciality_Clinic_Incharge').val(),
        Speciality_ID:$('#Speciality_ID').val(),
        Sub_Speciality_ID:$('#Sub_Speciality_ID').val(),
        Speciality_Clinic_Start_Time: $('#Speciality_Clinic_Start_Time').val(),
        Speciality_Clinic_End_Time: $('#Speciality_Clinic_End_Time').val(),
        Speciality_Clinic_Off_Days: Speciality_Clinic_Off_Days,
        Speciality_Clinic_Contact: $('#Speciality_Clinic_Contact').val(),
        Speciality_Clinic_Email: $('#Speciality_Clinic_Email').val(),
        Contact_Type_LOV_ID: $('#Contact_Type_LOV_ID').val(),
        
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3

       
    };
    $.ajax({
        url: baseUrl + '/api/SpecialityClinic',
        data: JSON.stringify(dataObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');

            $('#SpecialityClinic').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    var dataObj = {
        Speciality_Clinic_ID: $('#Speciality_Clinic_ID').val()     
      
    };
    med.message_confirm(
        "Speciality Clinic will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/SpecialityClinic/',
                    data: JSON.stringify(dataObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        $('#SpecialityClinic').DataTable().ajax.reload();
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
    $('#Speciality_Clinic_ID').val("");
    $('#Tenant_ID').val("");
    $('#Hospital_ID').val("");
    $('#Speciality_Clinic_Description').val("");
    $('#Speciality_Clinic_Detail').val("");
    $('#Speciality_Clinic_Code').val("");
    $('#Speciality_Clinic_Incharge').val("");
    $('#Speciality_ID').val("");
    $('#Sub_Speciality_ID').val("");
    $('#Speciality_Clinic_Start_Time').val("");
    $('#Speciality_Clinic_End_Time').val("");
    $('#Speciality_Clinic_Off_Days').val("");
    $('#Contact_Type_LOV_ID').val(""),

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#Hospital_ID').css('border-color', 'lightgrey');
    $('#Speciality_Clinic_Code').css('border-color', 'lightgrey');
}

function SetNGetCheckbox(Type, arr) {
    if (Type == 'Create') {

        var Speciality_Clinic_Off_Days = $('input[name="Speciality_Clinic_Off"]:checked').map(function () {
            return this.value;
        }).get().join(",");
        return Speciality_Clinic_Off_Days;
    }
    if (Type == 'Get') {

       // var arr = row[0].Speciality_Clinic_Off_Days;
        var arrlngth = arr.split(',');
        for (var i = 0; i < arrlngth.length; i++) {

            $('input[type=checkbox][value=' + arrlngth[i] + ']').prop('checked', true);

        }
    }

}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Hospital_ID').val().trim() == "Choose One") {
        $('#Hospital_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Hospital_ID').css('border-color', 'lightgrey');
    }
    if ($('#Speciality_Clinic_Code').val().trim() == "") {
        $('#Speciality_Clinic_Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Speciality_Clinic_Code').css('border-color', 'lightgrey');
    }
    if ($('#Speciality_Clinic_Description').val().trim() == "") {
        $('#Speciality_Clinic_Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Speciality_Clinic_Description').css('border-color', 'lightgrey');
    }
    if ($('#Speciality_Clinic_Contact').val().trim() != "" && ($('#Contact_Type_LOV_ID').val() == "Choose One" || $('#Contact_Type_LOV_ID').val() == null )) {
        $('#Contact_Type_LOV_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Contact_Type_LOV_ID').css('border-color', 'lightgrey');
    }
    return isValid;
}


    

