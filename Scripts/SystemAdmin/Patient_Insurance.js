Load_Combo_LOV("CoverageType", "#Mode_of_Coverage_LOV_ID", "");
Load_Combo_LOV("CoverageType", "#Coverage_Type_LOV_ID", "");
Load_Combo_LOV("CoverageType", "#Coverage_Provider_LOV_ID", "");
Load_Combo_LOV("CoverageType", "#Coverage_Plan_LOV_ID", "");
Load_Combo_LOV("CoverageType", "#Gaurantor_Relation_LOV_ID", "");
Load_Combo_Country("#Coverage_Country_ID", "");
//Load_Combo_State("#Coverage_State_ID", "");
//Load_Combo_City("#Coverage_City_ID", "");




$("#Coverage_Country_ID").change(function () {
    debugger;
    var _Countryid = $('#Coverage_Country_ID').val();
    if (_Countryid != "Choose One") {
        var _Clause = 'Country_ID =' + _Countryid;
        $.ajax({
            url: baseUrl + "/api/State/Dynamic/" + _Clause,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                debugger;
                var len = response.length;

                $('#Coverage_State_ID').empty();
                $('#Coverage_State_ID').append($('<option></option>').val(0).html("Choose One"));
                for (var i = 0; i < len; i++) {
                    id = response[i]['State_ID'],
                        name = response[i]['State_Name']
                    $("#Coverage_State_ID").append("<option value='" + id + "'>" + name + "</option>");


                }

            },
            error: function (errorThrown) {
                $('#Coverage_State_ID').empty();
                $('#Coverage_State_ID').append($('<option></option>').val(0).html("Choose One"));
                console.log(errorThrown);
            }
        });
    } else {
        $('#State_ID').val("Choose One");
    }

});
$("#Coverage_State_ID").change(function () {
    debugger;
    var _State_ID = $('#Coverage_State_ID').val();
    if (_State_ID != "Choose One") {
        var _Clause = 'State_ID =' + _State_ID;
        $.ajax({
            url: baseUrl + "/api/City/Dynamic/" + _Clause,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                debugger;
                var len = response.length;

                $('#Coverage_City_ID').empty();
                $('#Coverage_City_ID').append($('<option></option>').val(0).html("Choose One"));
                for (var i = 0; i < len; i++) {
                    var id = response[i]['City_ID'];
                    var name = response[i]['City_Name'];

                    $("#Coverage_City_ID").append("<option value='" + id + "'>" + name + "</option>");

                }

            },
            error: function (errorThrown) {
                $('#Coverage_City_ID').empty();
                $('#Coverage_City_ID').append($('<option></option>').val(0).html("Choose One"));
                console.log(errorThrown);
            }
        });
    } else {
        $('#City_ID').val("Choose One");
    }

});

function SaveData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var FormData = {
        Patient_ID: $('#Patient_ID').val(),
        Mode_of_Coverage_LOV_ID: $('#Mode_of_Coverage_LOV_ID').val(),
        Coverage_Type_LOV_ID: $('#Coverage_Type_LOV_ID').val(),
        Coverage_Provider_LOV_ID: $('#Coverage_Provider_LOV_ID').val(),
        Coverage_Expiry_Date: $('#Coverage_Expiry_Date').val(),
        Coverage_Notes: $('#Coverage_Notes').val(),
        Coverage_Country_ID: $('#Coverage_Country_ID').val(),
        Coverage_State_ID: $('#Coverage_State_ID').val(),
        Coverage_City_ID: $('#Coverage_City_ID').val(),
        Coverage_Zip_Code: $('#Coverage_Zip_Code').val(),
        Gaurantor_Name: $('#Gaurantor_Name').val(),
        Gaurantor_DOB: $('#Gaurantor_DOB').val(),
        Coverage_Plan_LOV_ID: $('#Coverage_Plan_LOV_ID').val(),
        Gaurantor_Relation_LOV_ID: $('#Gaurantor_Relation_LOV_ID').val(),
        Coverage_Verified: $('input[name="Coverage_Verified"]:checked').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    $.ajax({

        url: baseUrl + "/api/PatientCoverage",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(FormData),
       // async: false, 
        success: function (response) {
            debugger;
            $('#IIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#II_List').DataTable().ajax.reload();
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
  
}
function UpdateData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}

    var FormData = {
        Patient_Coverage_ID: $('#Patient_Coverage_ID').val(),
        Patient_ID: $('#Patient_ID').val(),
        Mode_of_Coverage_LOV_ID: $('#Mode_of_Coverage_LOV_ID').val(),
        Coverage_Type_LOV_ID: $('#Coverage_Type_LOV_ID').val(),
        Coverage_Provider_LOV_ID: $('#Coverage_Provider_LOV_ID').val(),
        Coverage_Expiry_Date: $('#Coverage_Expiry_Date').val(),
        Coverage_Notes: $('#Coverage_Notes').val(),
        Coverage_Country_ID: $('#Coverage_Country_ID').val(),
        Coverage_State_ID: $('#Coverage_State_ID').val(),
        Coverage_City_ID: $('#Coverage_City_ID').val(),
        Coverage_Zip_Code: $('#Coverage_Zip_Code').val(),
        Gaurantor_Name: $('#Gaurantor_Name').val(),
        Gaurantor_DOB: $('#Gaurantor_DOB').val(),
        Coverage_Plan_LOV_ID: $('#Coverage_Plan_LOV_ID').val(),
        Gaurantor_Relation_LOV_ID: $('#Gaurantor_Relation_LOV_ID').val(),
        Coverage_Verified: $('input[name="Coverage_Verified"]:checked').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    $.ajax({
        url: baseUrl + "/api/PatientCoverage",
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(FormData),
        success: function (response) {
            debugger;
            $('#IIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Updated Successfully.")
            });

            $('#II_List').DataTable().ajax.reload();
        },
        error: function (errorThrown) {
          
            console.log(errorThrown);
        }
    });
}

function DeleleData() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        var formData = {
            Patient_Coverage_ID: $('#Patient_Coverage_ID').val()
        }
        $.ajax({
            url: baseUrl + "/api/PatientCoverage",
            type: "Delete",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (response) {
                $('#IIModal').modal('hide');

                setTimeout(function () {
                    debugger;
                    med.notify_info("Record Deleted Successfully.")
                });

                $('#II_List').DataTable().ajax.reload();
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }
}
function Refresh() {
        $('#Patient_Coverage_ID').val(""),
        $('#Patient_ID').val(""),
        $('#Mode_of_Coverage_LOV_ID').val(""),
        $('#Coverage_Type_LOV_ID').val(""),
        $('#Coverage_Provider_LOV_ID').val(""),
        $('#Doc_Expiry_Date').val(""),
        $('#Doc_Details').val(""),
        $('#Coverage_Country_ID').val(""),
        $('#Coverage_State_ID').val(""),
        $('#Coverage_City_ID').val(""),
        $('#Coverage_Zip_Code').val(""),
        $('#Gaurantor_Name').val(""),
        $('#Gaurantor_DOB').val(""),
        $('#Coverage_Plan_LOV_ID').val(""),
        $('#Gaurantor_Relation_LOV_ID').val(""),
        $('#Coverage_Verified').val("")

}
