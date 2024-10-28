


function CI_SaveData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var FormData = {
        Person_Address_ID: $('#CI_Person_Address_ID').val(),
        Person_ID: $('#CI_Person_ID').val(),
        Tenant_ID: $('#CI_Tenant_ID').val(),
        Address_ID: $('#CI_Address_ID').val(),

        Address_Line_1: $('#Address_Line_1').val(),
        Address_Line_2: $('#Address_Line_2').val(),
        Address_Line_3: $('#Address_Line_3').val(),
        Country_ID: $('#Country_ID').val(),
        State_ID: $('#State_ID').val(),
        City_ID: $('#City_ID').val(),
        Postal_Zip_Code: $('#Postal_Zip_Code').val(),
        Address_Contact_Type1_LOV_ID: $('#Address_Contact_Type1_LOV_ID').val(),
        Address_Contact_1: $('#Address_Contact_1').val(),
        Address_Contact_Type2_LOV_ID: $('#Address_Contact_Type2_LOV_ID').val(),
        Address_Contact_2: $('#Address_Contact_2').val(),
        Address_Email_1: $('#Address_Email_1').val(),
        Address_Email_2: $('#Address_Email_2').val(),
        Address_Type_LOV_ID: $('#Address_Type_LOV_ID').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3,
    };

    $.ajax({

        url: baseUrl + "/api/Person_Address",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(FormData),
       // async: false, 
        success: function (response) {
            debugger;
            $('#CIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#CI_List').DataTable().ajax.reload();
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
    return $('#Address_ID').val();
}
function CI_UpdateData() {
    debugger;
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}

    var FormData = {
        Person_Address_ID: $('#CI_Person_Address_ID').val(),
        Person_ID: $('#CI_Person_ID').val(),
        Tenant_ID: $('#CI_Tenant_ID').val(),
        Address_ID: $('#CI_Address_ID').val(),

        Address_Line_1: $('#Address_Line_1').val(),
        Address_Line_2: $('#Address_Line_2').val(),
        Address_Line_3: $('#Address_Line_3').val(),
        Country_ID: $('#Country_ID').val(),
        State_ID: $('#State_ID').val(),
        City_ID: $('#City_ID').val(),
        Postal_Zip_Code: $('#Postal_Zip_Code').val(),
        Address_Contact_Type1_LOV_ID: $('#Address_Contact_Type1_LOV_ID').val(),
        Address_Contact_1: $('#Address_Contact_1').val(),
        Address_Contact_Type2_LOV_ID: $('#Address_Contact_Type2_LOV_ID').val(),
        Address_Contact_2: $('#Address_Contact_2').val(),
        Address_Email_1: $('#Address_Email_1').val(),
        Address_Email_2: $('#Address_Email_2').val(),
        Address_Type_LOV_ID: $('#Address_Type_LOV_ID').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3,
    };
    $.ajax({
        url: baseUrl + "/api/Person_Address",
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(FormData),
        success: function (response) {
            debugger;
            $('#CIModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Updated Successfully.")
            });

            $('#CI_List').DataTable().ajax.reload();
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
function CI_DeleleData() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        var formData = {
           
            Person_Address_ID: $('#CI_Person_Address_ID').val()
        }
        $.ajax({
            url: baseUrl + "/api/Person_Address",
            type: "Delete",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (response) {
                $('#CIModal').modal('hide');

                setTimeout(function () {
                    debugger;
                    med.notify_info("Record Deleted Successfully.")
                });

                $('#CI_List').DataTable().ajax.reload();
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }
}
function Refresh() {
            $('#CI_Person_Address_ID').val(""),
            $('#CI_Person_ID').val(""),
            $('#CI_Tenant_ID').val(""),
            $('#CI_Address_ID').val(""),

           $('#Address_Line_1').val(""),
           $('#Address_Line_2').val(""),
           $('#Address_Line_3').val(""),
           $('#Country_ID').val(""),
           $('#State_ID').val(""),
           $('#City_ID').val(""),
           $('#Postal_Zip_Code').val(""),
           $('#Address_Contact_Type1_LOV_ID').val(""),
           $('#Address_Contact_1').val(""),
           $('#Address_Contact_Type2_LOV_ID').val(""),
               $('#Address_Contact_2').val(""),
               $('#Address_Type_LOV_ID').val(""),

           $('#Address_Email_1').val(""),
           $('#Address_Email_2').val("")
   
}
