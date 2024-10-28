Load_Combo_Country("#Country_ID","");
Load_Combo_LOV("ContactType", "#Address_Contact_Type1_LOV_ID", "");
Load_Combo_LOV("ContactType", "#Address_Contact_Type2_LOV_ID", "");
Load_Combo_LOV("AddressType", "#Address_Type_LOV_ID", "0");

$("#Country_ID").change(function () {
        debugger;
        var _Countryid = $('#Country_ID').val();
        if (_Countryid != "Choose One") {
            var _Clause = 'Country_ID =' + _Countryid;
            $.ajax({
                url: baseUrl + "/api/State/Dynamic/" + _Clause,
                type: "GET",
                dataType: 'json',
                contentType: 'application/json',
                // data: JSON.stringify(whereClause),
                success: function (response) {
                    debugger;
                    var len = response.length;

                    $('#State_ID').empty();
                    $('#State_ID').append($('<option></option>').val("").html("Choose One"));
                    for (var i = 0; i < len; i++) {
                         id = response[i]['State_ID'],
                        name= response[i]['State_Name']
                        $("#State_ID").append("<option value='" + id + "'>" + name + "</option>");

                       
                    }

                    },
                error: function (errorThrown) {
                    $('#State_ID').empty();
                    $('#State_ID').append($('<option></option>').val("").html("Choose One"));
                    console.log(errorThrown);
                }
            });
        } else {
            $('#State_ID').val("Choose One");
        }

});
$("#State_ID").change(function () {
        debugger;
        var _State_ID = $('#State_ID').val();
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

                    $('#City_ID').empty();
                    $('#City_ID').append($('<option></option>').val("").html("Choose One"));
                    for (var i = 0; i < len; i++) {
                        var id = response[i]['City_ID'];
                        var name = response[i]['City_Name'];

                        $("#City_ID").append("<option value='" + id + "'>" + name + "</option>");

                    }

                    },
                error: function (errorThrown) {
                    $('#City_ID').empty();
                    $('#City_ID').append($('<option></option>').val("").html("Choose One"));
                    console.log(errorThrown);
                }
            });
        } else {
            $('#City_ID').val("Choose One");
        }

    });

function Load_Combo_Country(ComboType,seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Country",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        //  data: JSON.stringify(provinceName),
        success: function (response) {
            debugger;
            var len = response.length;

            $(ComboType).empty();
            $(ComboType).append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Country_ID'];
                var name = response[i]['Country_Name'];

                $(ComboType).append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined && seletedValue == "") {

                $(ComboType).val(seletedValue);
            }
            else {
                $(ComboType).val(0);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
function Load_Combo_State(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/State",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#State_ID').empty();
            $('#State_ID').append($('<option></option>').val("Choose One").html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['State_ID'];
                var name = response[i]['State_Name'];

                $("#State_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined) {

                $('#State_ID').val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
function Load_Combo_City(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/City",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#City_ID').empty();
            $('#City_ID').append($('<option></option>').val("Choose One").html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['City_ID'];
                var name = response[i]['City_Name'];

                $("#City_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined) {

                $('#City_ID').val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
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
    var AddressData = {
        Address_Line_1: $('#Address_Line_1').val(),
        Address_Line_2: $('#Address_Line_2').val(),
        Address_Line_3: $('#Address_Line_3').val(),
        Country_ID: $('#Country_ID').val(),
        State_ID: $('#State_ID').val(),
        City_ID: $('#City_ID').val(),
        Postal_Zip_Code: $('#Postal_Zip_Code').val(),
        Address_Type_LOV_ID: $('#Address_Type_LOV_ID').val(),
        Address_Contact_Type1_LOV_ID: $('#Address_Contact_Type1_LOV_ID').val(),
        Address_Contact_1: $('#Address_Contact_1').val(),
        Address_Contact_Type2_LOV_ID: $('#Address_Contact_Type2_LOV_ID').val(),
        Address_Contact_2: $('#Address_Contact_2').val(),
        Address_Email_1: $('#Address_Email_1').val(),
        Address_Email_2: $('#Address_Email_2').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 'admin',
        //  Audit_Date: new Date($.now())
        // User: sessionStorage.getItem("UserName")
    };

    $.ajax({

        url: baseUrl + "/api/Address",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',

        data: JSON.stringify(AddressData),
       // async: false, 
        success: function (response) {
            debugger;
            $('#Address_ID').val(response);
            // toastr.success("Saved Successfully", "Success!");
            // Refresh();

        },
        error: function (errorThrown) {
            //  toastr.error("Data Not Saved at Address", "Error!");
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
    var formData = {
        Address_ID: $('#Address_ID').val(),
        Address_Line_1: $('#Address_Line_1').val(),
        Address_Line_2: $('#Address_Line_2').val(),
        Address_Line_3: $('#Address_Line_3').val(),
        Country_ID: $('#Country_ID').val(),
        State_ID: $('#State_ID').val(),
        City_ID: $('#City_ID').val(),
        Postal_Zip_Code: $('#Postal_Zip_Code').val(),
        Address_Type_LOV_ID: $('#Address_Type_LOV_ID').val(),
        Address_Contact_Type1_LOV_ID: $('#Address_Contact_Type1_LOV_ID').val(),
        Address_Contact_1: $('#Address_Contact_1').val(),
        Address_Contact_Type2_LOV_ID: $('#Address_Contact_Type2_LOV_ID').val(),
        Address_Contact_2: $('#Address_Contact_2').val(),
        Address_Email_1: $('#Address_Email_1').val(),
        Address_Email_2: $('#Address_Email_2').val(),
        Audit_Date: new Date($.now()),
        Audit_By: 'admin',
        //  Audit_Date: new Date($.now())
        // User: sessionStorage.getItem("UserName")
    };

    $.ajax({
        url: baseUrl + "/api/Address",
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(formData),
        success: function (response) {
            debugger;

            toastr.success("Updated Successfully" + response, "Success!");
            Refresh();

        },
        error: function (errorThrown) {
            toastr.error("Data Not Saved", "Error!");
            console.log(errorThrown);
        }
    });
}
function Get_Address(Address_ID) {
    debugger;
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
                Load_Combo_Country("#Country_ID",response[i].Country_ID);
                Load_Combo_State(response[i].State_ID);
                Load_Combo_City(response[i].City_ID);
                Load_Combo_LOV("ContactType", "#Address_Contact_Type1_LOV_ID", response[i].Address_Contact_Type1_LOV_ID);
                Load_Combo_LOV("ContactType", "#Address_Contact_Type2_LOV_ID", response[i].Address_Contact_Type2_LOV_ID);
                Load_Combo_LOV("AddressType", "#Address_Type_LOV_ID", response[i].Address_Type_LOV_ID);

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
function Delele() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        var formData = {
            Address_ID: $('#Address_ID').val()
        }
        $.ajax({
            url: baseUrl + "/api/Address",
            type: "Delete",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (response) {
                toastr.success("Deleted Successfully" + response, "Success!");
                Refresh();
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }
}
function Refresh() {
    $('#Address_Line_1').val(""),
        $('#Address_Line_2').val(""),
        $('#Address_Line_3').val(""),
        $('#Country_ID').val(""),
        $('#State_ID').val(""),
        $('#City_ID').val(""),
        $('#Postal_Zip_Code').val(""),
        
        $('#Address_Type_LOV_ID').val(""),
        $('#Address_Contact_Type1_LOV_ID').val(""),
        $('#Address_Contact_1').val(""),
        $('#Address_Contact_Type2_LOV_ID').val(""),
        $('#Address_Contact_2').val(""),
        $('#Address_Email_1').val(""),
        $('#Address_Email_2').val(""),
        //$('#btnUpdate').hide();
        //$('#btnAdd').show();
        $('#Country_ID').css('border-color', 'lightgrey');
        $('#State_ID').css('border-color', 'lightgrey');
        $('#City_ID').css('border-color', 'lightgrey');



}
