"use strict";
var initilizeDataTable = function () {

    var initTable1 = function () {

        var table = $('#Employee_List');

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
                url: baseUrl + '/api/HospitalSetup',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    return jsonData;
                }
            },


            columns: [
                { data: null, responsivePriority: 0 },
                { data: 'Hospital_ID' },
                { data: 'Tenant' },
                { data: 'Hospital_Description' },
                { data: 'Hospital_License_No' },
                { data: 'Hospital_Contact_Person' },
                { data: 'Hospital_Slogan' },
                { data: 'Entered_Date' },
                { data: 'Entered_By' },

            ],

            columnDefs: [
                {
                    targets: 1,
                    title: 'ID',
                    orderable: false,
                    visible: false
                },

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
                                      aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                         <div class="dropdown-menu"
                                                  aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Hospital_ID + `, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                     <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Hospital_ID + `, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
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
            initTable1();
        },

    };

}();

jQuery(document).ready(function () {

    initilizeDataTable.init();
   
    $("#Employee_List_wrapper").css("width", "100%")

});

$('#Employee_List tbody').on('click', '#Edit', function () {
    debugger;
    var data = table.DataTable().row($(this).parents('tr')).data();
    getEditRowData(data);
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
            $('#Speciality_ID').append($('<option></option>').val("Choose One").html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Speciality_ID'];
                var name = response[i]['Speciality_Name'];

                $("#Speciality_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined) {

                $('#Speciality_ID').val(seletedValue);
            }
        },
       
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
function Load_Combo_Sub_Speciality(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Speciality",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Sub_Speciality_ID').empty();
            $('#Sub_Speciality_ID').append($('<option></option>').val("Choose One").html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Sub_Speciality_ID'];
                var name = response[i]['Sub_Speciality_Name'];

                $("#Sub_Speciality_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined) {

                $('#Sub_Speciality_ID').val(seletedValue);
            }
        },

        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
function Load_Combo_Hospital(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Speciality",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Hospital_ID').empty();
            $('#Hospital_ID').append($('<option></option>').val("Choose One").html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Hospital_ID'];
                var name = response[i]['Hospital_Description'];

                $("#Hospital_ID").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined) {

                $('#Hospital_ID').val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
var getEditRowData = function (data) {
    debugger;
    var url = editurls + '/HospitalSetup/HospitalSetup'
    var id = 1;
   
    openPopup(url, id, row);
};


$("#btnCreate").click(function () {
    debugger;
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    Load_Combo_Speciality();
    Load_Combo_Sub_Speciality();
    Load_Combo_Hospital();
    openPopup(url, id, '', "Create");
});

$("#Update").click(function () {
    debugger;
    Update();
});

var openPopup = function (url, id, row, popupStatus) {

    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#myModalContent').html(data);
            $('#myModal').modal(options);
            $('#myModal').modal('show');
            $("#ShowAddress").load(editurls);

            if (popupStatus == "Update") {
                $('#Delete').hide();
                $('#SaveChanges').hide();
                $('#Update').show();


            }
            else if (popupStatus == "Create") {
                debugger;
                $('#Delete').hide();
                $('#Update').hide();
                $('#SaveChanges').show();

            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#Delete').show();

                $('#exampleModalLabel').text("Delete Tenant");

            }
            if (popupStatus == "Update" || popupStatus == "Delete") {
                $('#Hospital_ID').val(row[0].Hospital_ID),
                    $('#Tenant_ID').val(row[0].Tenant_ID);
                $('#Hospital_Description').val(row[0].Hospital_Description);
                $('#Hospital_EIN').val(row[0].Hospital_EIN);
                $('#Hospital_NPI').val(row[0].Hospital_NPI);
                $('#Hospital_NTN').val(row[0].Hospital_NTN);
                $('#Hospital_Contact_Person').val(row[0].Hospital_Contact_Person);
                $('#Hospital_URL').val(row[0].Hospital_URL);
                $('#Hospital_License_No').val(row[0].Hospital_License_No);
                $('#Hospital_Address_ID').val(row[0].Hospital_Address_ID);
                $('#Hospital_TimeZone').val(row[0].Hospital_TimeZone);
                $('#Hospital_Specialization').val(row[0].Hospital_Specialization);
                $('#Hospital_Slogan').val(row[0].Hospital_Slogan);
                debugger;
              
                Get_Address(row[0].Hospital_Address_ID);
                //$.when(Load_Combo_Country()).then(function () {

                //    $.when(Load_Combo_State()).then(function () {
                //        $.when(Load_Combo_City()).then(function () {
                //            Get_Address(row[0].Hospital_Address_ID)
                //        })
                //       // Get_Address(row[0].Hospital_Address_ID);
                //    })
                //   // Get_Address(row[0].Hospital_Address_ID);
                //})
              
                //$('#Address_Line_1').val(row[0].Address_Line_1);
                //$('#Address_Line_2').val(row[0].Address_Line_2);
                //$('#Address_Line_3').val(row[0].Address_Line_3);
                //$('#Country_ID').val(row[0].Country_ID);
                //$('#State_ID').val(row[0].State_ID);
                //$('#City_ID').val(row[0].City_ID);
                //$('#Postal_Zip_Code').val(row[0].Postal_Zip_Code);
                //$('#Address_Contact_Type1_LOV_ID').val(row[0].Address_Contact_Type1_LOV_ID);
                //$('#Address_Contact_1').val(row[0].Address_Contact_1);
                //$('#Address_Contact_Type2_LOV_ID').val(row[0].Address_Contact_Type2_LOV_ID);
                //$('#Address_Contact_2').val(row[0].Address_Contact_2);
                //$('#Address_Email_1').val(row[0].Address_Email_1);
                //$('#Address_Email_2').val(row[0].Address_Email_2);
            }

        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });


};
//Add Data Function

//Function for getting the Data Based upon Employee ID
function getbyID(Hospital_ID, flag) {
    debugger;
   
    $.ajax({
        url: baseUrl + "/api/HospitalSetup/" + Hospital_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
          
           
            
            var url = $('#btnCreate').data('url');

            openPopup(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for updating employee's record
function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    var formData = {
        Hospital_ID: $('#Hospital_ID').val(),
        Tenant_ID: $('#Tenant_ID').val(),
        Hospital_Description: $('#Hospital_Description').val(),
        Hospital_EIN: $('#Hospital_EIN').val(),
        Hospital_NPI: $('#Hospital_NPI').val(),
        Hospital_NTN: $('#Hospital_NTN').val(),
        Hospital_Contact_Person: $('#Hospital_Contact_Person').val(),
        Hospital_URL: $('#Hospital_URL').val(),
        Hospital_License_No: $('#Hospital_License_No').val(),
        Hospital_Address_ID: $('#Hospital_Address_ID').val(),
        Hospital_TimeZone: $('#Hospital_TimeZone').val(),
        Hospital_Specialization: $('#Hospital_Specialization').val(),
        Hospital_Slogan: $('#Hospital_Slogan').val(),

        Audit_Date: new Date($.now()),
        Audit_By: '2',

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
        Address_Type_LOV_ID: $('#Address_Type_LOV_ID').val()
    }


    $.ajax({
        url: baseUrl + "/api/HospitalSetup",
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',

        data: JSON.stringify(formData),
        success: function (response) {
            debugger;
            $('#myModal').modal('hide');

            $('#Employee_List').DataTable().ajax.reload();
            //toastr.success("Updated Successfully" + response, "Success!");
        },
        error: function (errorThrown) {
            toastr.error("Data Not Saved", "Error!");
            console.log(errorThrown);
        }
    });
}

//function for deleting employee's record

function Delete() {
    var formData = {
        Hospital_ID: $('#Hospital_ID').val()
    }
    med.message_confirm(
        "Hospital "+ "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/HospitalSetup/',
                    data: JSON.stringify(formData),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        med.notify_success('success','Deleted Successfully');
                        $('#myModal').modal('hide');
                        $('#Employee_List').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {
                        med.message_error('error',errormessage.responseText); 
                       
                    }
                });
            }
        }
    );


}

//Function for clearing the textboxes
function M_Refresh() {
    $('#Hospital_ID').val(""),
        $('#Tenant_ID').val(""),
        $('#Hospital_Description').val(""),
        $('#Hospital_EIN').val(""),
        $('#Hospital_NPI').val(""),
        $('#Hospital_NTN').val(""),
        $('#Hospital_Contact_Person').val(""),
        $('#Hospital_URL').val(""),
        $('#Hospital_License_No').val(""),
        $('#Hospital_Address_ID').val(""),
        $('#Hospital_TimeZone').val(""),
        $('#Hospital_Specialization').val(""),
        $('#Hospital_Slogan').val("")
}
//Valdidation using jquery

function validate() {
    var isValid = true;
    if ($('#Hospital_Description').val().trim() == "") {
        $('#Hospital_Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Hospital_Description').css('border-color', 'lightgrey');
    }

    return isValid;
}