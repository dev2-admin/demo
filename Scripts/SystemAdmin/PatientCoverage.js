
Load_Combo_LOV("DocumentType", "#Doc_Type_LOV_ID", "");


function validate() {
    var isValid = true;
    if ($('#Country_ID').val().trim() == "Choose One") {
        $('#Country_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country_ID').css('border-color', 'lightgrey');
    }
    if ($('#State_ID').val().trim() == "Choose One") {
        $('#State_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State_ID').css('border-color', 'lightgrey');
    }
    if ($('#City_ID').val().trim() == "Choose One") {
        $('#City_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City_ID').css('border-color', 'lightgrey');
    }
    return isValid;
}
function SaveData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var FormData = {
        Person_ID: $('#Person_ID').val(),
        Tenant_ID: $('#Tenant_ID').val(),
        Doc_Description: $('#Doc_Description').val(),
        Doc_Type_LOV_ID: $('#Doc_Type_LOV_ID').val(),
        Doc_Issuace_Date: new Date($.now()),
        Doc_Expiry_Date: $('#Doc_Expiry_Date').val(),
        Doc_Details: $('#Doc_Details').val(),
        Doc_File_URL:null,
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3,
    };

    $.ajax({

        url: baseUrl + "/api/PersonDocuments",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(FormData),
       // async: false, 
        success: function (response) {
            debugger;
            $('#DIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#DI_List').DataTable().ajax.reload();
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
    return $('#Address_ID').val();
}
function UpdateData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}

    var FormData = {
        Person_Doc_ID: $('#Person_Doc_ID').val(),
        Person_ID: $('#Person_ID').val(),
        Tenant_ID: $('#Tenant_ID').val(),
        Doc_Description: $('#Doc_Description').val(),
        Doc_Type_LOV_ID: $('#Doc_Type_LOV_ID').val(),
        Doc_Issuace_Date: new Date($.now()),
        Doc_Expiry_Date: $('#Doc_Expiry_Date').val(),
        Doc_Details: $('#Doc_Details').val(),
        Doc_File_URL: null,
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3,
    };
    $.ajax({
        url: baseUrl + "/api/PersonDocuments",
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(FormData),
        success: function (response) {
            debugger;
            $('#DIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Updated Successfully.")
            });

            $('#DI_List').DataTable().ajax.reload();
        },
        error: function (errorThrown) {
          
            console.log(errorThrown);
        }
    });
}
function Get_Address(Address_ID) {
   // var Address_ID = $('#Address_ID').val();
    $.ajax({
        url: baseUrl + "/api/Address/" + Address_ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (response) {
            debugger;
            var len = response.length;

            for (var i = 0; i < len; i++) {
                Load_Combo_Country(response[i].Country_ID);
                Load_Combo_State(response[i].State_ID);
                Load_Combo_City(response[i].City_ID);
                Load_Combo_LOV("ContactType", "#Address_Contact_Type1_LOV_ID", response[i].Address_Contact_Type1_LOV_ID);
                Load_Combo_LOV("ContactType", "#Address_Contact_Type2_LOV_ID", response[i].Address_Contact_Type2_LOV_ID);

                $('#Address_ID').val(response[i].Address_ID);
                $('#Address_Line_1').val(response[i].Address_Line_1);
                $('#Address_Line_2').val(response[i].Address_Line_2);
                $('#Address_Line_3').val(response[i].Address_Line_3);
                //$('#Country_ID').val(response[i].Country_ID);
               // $('#State_ID').val(response[i].State_ID);
               // $('#City_ID').val(response[i].City_ID);
                $('#Postal_Zip_Code').val(response[i].Postal_Zip_Code);
              //  $('#Address_Contact_Type1_LOV_ID').val(response[i].Address_Contact_Type1_LOV_ID);
                $('#Address_Contact_1').val(response[i].Address_Contact_1);
               // $('#Address_Contact_Type2_LOV_ID').val(response[i].Address_Contact_Type2_LOV_ID);
                $('#Address_Contact_2').val(response[i].Address_Contact_2);
                $('#Address_Email_1').val(response[i].Address_Email_1);
                $('#Address_Email_2').val(response[i].Address_Email_2);

            }

            },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
    return false;
}
function DeleleData() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        var formData = {
            Person_Doc_ID: $('#Person_Doc_ID').val()
        }
        $.ajax({
            url: baseUrl + "/api/PersonDocuments",
            type: "Delete",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (response) {
                $('#DIModal').modal('hide');

                setTimeout(function () {
                    debugger;
                    med.notify_info("Record Deleted Successfully.")
                });

                $('#DI_List').DataTable().ajax.reload();
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }
}
function Refresh() {
        $('#Person_ID').val(""),
        $('#Tenant_ID').val(""),
        $('#Doc_Description').val(""),
        $('#Doc_Type_LOV_ID').val(""),
        $('#Doc_Expiry_Date').val(""),
        $('#Doc_Details').val("")
}
