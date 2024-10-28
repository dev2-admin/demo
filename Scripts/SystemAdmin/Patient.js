var table;
var PatientListTable = function () {

    var initTable1 = function () {
        table = $('#PatientList');

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
                url: baseUrl + '/api/Patient',
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
                { data: 'MR_No' },
                { data: 'Person_Full_Name' },
                { data: 'Preferred_Provider_Name' },
                { data: 'Country_Name' },
                { data: 'SSN' },
                { data: 'CNIC' },
                { data: 'Gender_LOV_D' },
                { data: 'Emergency_Contact_Name' },
                { data: 'Emergency_Contact_Number' }

            ],
            columnDefs: [
				{
                    targets: 5,
                    title: 'SSN',
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
                                   <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Patient_ID + `, 'Update');return false;"><i class="fa fa-edit"></i> Edit</a>                         
                                   <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Patient_ID + `, 'Delete');return false;"><i class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div> `;
                    },
                },
            ],

       
            });

        var oTable = $('#PatientList').DataTable();  
        $('#myInputTextField').keyup(function () {
            oTable.search($(this).val()).draw();
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

$('#myInputTextField').keyup(function () {
    table.DataTable().search($(this).val()).draw();
});
var DataListTable = function () {

    var initTable1 = function () {
        var table = $('#DI_List');

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
                url: baseUrl + '/api/PersonDocuments',
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
                { data: 'Doc_Description' },
                { data: 'Doc_Details' },
                { data: 'Doc_Type_LOV_ID' },
                { data: 'Doc_Expiry_Date' },
                { data: 'Entered_By' },
                { data: 'Entered_Date' },
                { data: 'Audit_Date' },
                { data: 'Audit_By' },

            ],
            columnDefs: [
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
                                   <a class="dropdown-item" href="#" onClick="Get_DI(`+ data.Person_Doc_ID + `, 'Update');return false;"><i class="fa fa-edit"></i> Edit</a>                         
                                   <a class="dropdown-item" href="#" onClick="Get_DI(`+ data.Person_Doc_ID + `, 'Delete');return false;"><i class="fa fa-trash" ></i>Delete</a>
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
            debugger;
            initTable1();
        },

    };

}();
var DataListTable_II = function () {

    var initTable_II = function () {
        var table = $('#II_List');

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
                url: baseUrl + '/api/PatientCoverage',
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
                { data: 'Mode_of_Coverage_LOV_D' },
                { data: 'Coverage_Type_LOV_D' },
                { data: 'Coverage_Provider_LOV_D' },
                { data: 'Coverage_Verified' },
                { data: 'Coverage_Expiry_Date' },
                { data: 'Coverage_Plan_LOV_D' },
                { data: 'Country_Name' },
                { data: 'State_Name' },
                { data: 'City_Name' },
                { data: 'Coverage_Zip_Code' },
                { data: 'Gaurantor_Name' },
                { data: 'Gaurantor_DOB' },
                { data: 'Gaurantor_Relation_LOV_D' },
                { data: 'Coverage_Notes' }

            ],
            columnDefs: [
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
                                   <a class="dropdown-item" href="#" onClick="Get_II(`+ data.Patient_Coverage_ID + `, 'Update');return false;"><i class="fa fa-edit"></i> Edit</a>                         
                                   <a class="dropdown-item" href="#" onClick="Get_II(`+ data.Patient_Coverage_ID + `, 'Delete');return false;"><i class="fa fa-trash" ></i>Delete</a>
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
            debugger;
            initTable_II();
        },

    };

}();
var DataListTable_CI = function () {

    var initTable_CI = function () {
        var table = $('#CI_List');

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
                url: baseUrl + '/api/Person_Address',
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
                { data: 'Address_Contact_1' },
                { data: 'Address_Line_1' },
                { data: 'Address_Email_1' },
                { data: 'Postal_Zip_Code' },
                { data: 'Country_Name' },
                { data: 'State_Name' },
                { data: 'City_Name' }

            ],
            columnDefs: [
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
                                   <a class="dropdown-item" href="#" onClick="Get_CI(`+ data.Person_Address_ID + `, 'Update');return false;"><i class="fa fa-edit"></i> Edit</a>                         
                                   <a class="dropdown-item" href="#" onClick="Get_CI(`+ data.Person_Address_ID + `, 'Delete');return false;"><i class="fa fa-trash" ></i>Delete</a>
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
            debugger;
            initTable_CI();
        },

    };

}();

jQuery(document).ready(function () {
    PatientListTable.init();
    $("#PatientList_wrapper").css("width", "100%")
   
});

$("#CreatePatient").click(function () {
    debugger;
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');
    Load_Combo_LOV("Gender", "#Gender_LOV_ID", "");
    Load_Combo_LOV("MaritalStatus", "#Marital_Status_LOV_ID", "");
    Load_Combo_LOV("Prefix", "#Person_Name_Prefix_LOV_ID", "");
    Load_Combo_Country("#Patient_Country_ID","0");
    Preferred_Provider(undefined);
    openPopup(url, id, '', "Create", "");
 
});

//
function HideShowTab(ActionType,FormType) {
    if (FormType =="Patient" && ActionType == "Create") {
        $('#Delete').hide();
        $('#SaveChanges').show();
        $('#Update').hide();
        $('#exampleModalLabel').text("Update Patient");


        $('#tabCI').hide();
        $('#tabII').hide();
        $('#tabDI').hide();
        $('#tabAcceptance').hide();

    }
    if (FormType == "Patient" && ActionType == "Update") {
        $('#Delete').hide();
        $('#SaveChanges').hide();
        $('#Update').show();
        $('#exampleModalLabel').text("Update Patient");

        $('#tabCI').show();
        $('#tabII').show();
        $('#tabDI').show();
        $('#tabAcceptance').show();

    }
    if (FormType == "Patient" && ActionType == "Delete") {
        $('#Update').hide();
        $('#SaveChanges').hide();
        $('#Delete').show();
        $('#exampleModalLabel').text("Delete Patient");

        $('#tabCI').show();
        $('#tabII').show();
        $('#tabDI').show();
        $('#tabAcceptance').show();

    }
    if (FormType == "DI") {
        if (ActionType == "Create") {
            $('#DeleteDI').hide();
            $('#SaveDI').hide();
            $('#UpdateDI').show();
            $('#DIModalLabel').text("Create Patient");
        }
        if (ActionType == "Update") {
            $('#DeleteDI').hide();
            $('#SaveDI').hide();
            $('#UpdateDI').show();
            $('#DIModalLabel').text("Update Patient");
        }
        if (ActionType == "Delete") {
            $('#UpdateDI').hide();
            $('#SaveDI').hide();
            $('#DeleteDI').show();
            $('#DIModalLabel').text("Delete Patient");

        }


    }
    if (FormType == "II") {
        if (ActionType == "Create") {
            $('#DeleteII').hide();
            $('#SaveII').show();
            $('#UpdateII').hide();
            $('#IIModalLabel').text("Create Insurance Information");
        }
        if (ActionType == "Update") {
            $('#DeleteII').hide();
            $('#SaveII').hide();
            $('#UpdateII').show();
            $('#IIModalLabel').text("Update Insurance Information");
        }
        if (ActionType == "Delete") {
            $('#UpdateII').hide();
            $('#SaveII').hide();
            $('#DeleteII').show();
            $('#IIModalLabel').text("Delete Insurance Information");

        }


    }
    if (FormType == "CI") {
        if (ActionType == "Create") {
            $('#DeleteCI').hide();
            $('#SaveCI').show();
            $('#UpdateCI').hide();
            $('#CIModalLabel').text("Create Contact Information");
        }
        if (ActionType == "Update") {
            $('#DeleteCI').hide();
            $('#SaveCI').hide();
            $('#UpdateCI').show();
            $('#CIModalLabel').text("Update Contact Information");
        }
        if (ActionType == "Delete") {
            $('#UpdateCI').hide();
            $('#SaveCI').hide();
            $('#DeleteCI').show();
            $('#CIModalLabel').text("Delete Contact Information");

        }


    }
}
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

            HideShowTab(flag, "Patient");

            if (flag == "Update" || flag == "Delete") {
                debugger;

                DataListTable.init();
                $("#DI_List_wrapper").css("width", "100%");

                DataListTable_II.init();
                $("#II_List_wrapper").css("width", "100%");

                DataListTable_CI.init();
                $("#CI_List_wrapper").css("width", "100%");

                Load_Combo_LOV("Gender", "#Gender_LOV_ID", row[0].Gender_LOV_ID);
                Load_Combo_LOV("MaritalStatus", "#Marital_Status_LOV_ID", row[0].Marital_Status_LOV_ID);
                Load_Combo_LOV("Prefix", "#Person_Name_Prefix_LOV_ID", row[0].Person_Name_Prefix_LOV_ID);

                Load_Combo_Country("#Patient_Country_ID",row[0].Country_ID);
                Preferred_Provider(row[0].Preferred_Provider);

                $('#Tenant_ID').val(row[0].Tenant_ID);
                $('#Person_ID').val(row[0].Person_ID);
                $('#Patient_ID').val(row[0].Patient_ID);


                $('#MR_No').val(row[0].MR_No);
                //  $('#Country_ID').val(row[0].Country_ID),
                $('#Primary_Care_Provider').val(row[0].Primary_Care_Provider);
                $('#OptionalField_1').val(row[0].OptionalField_1);
                $('#OptionalField_2').val(row[0].OptionalField_2);
                $('#OptionalField_3').val(row[0].OptionalField_3);
                $('#OptionalField_4').val(row[0].OptionalField_4);
                $('#OptionalField_5').val(row[0].OptionalField_5);
                //$('input[name="WPA"]:checked').val(row[0].Web_Portal_Access),

                $('#' + row[0].Web_Portal_Access).prop('checked', true);

                $('#SSN').val(row[0].SSN);
                $('#CNIC').val(row[0].CNIC);
                // $('#Date_of_Birth').val(row[0].Date_of_Birth);


                var now = new Date(row[0].Date_of_Birth);

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $('#Date_of_Birth').val(today);


                $('#Person_First_Name').val(row[0].Person_First_Name);
                $('#Person_Middle_Name').val(row[0].Person_Middle_Name);
                $('#Person_Last_Name').val(row[0].Person_Last_Name);
                $('#Father_Name').val(row[0].Father_Name);

                //  $('#Preferred_Provider').val(row[0].Person_Last_Name);
                //  $('#Gender_LOV_ID').val(row[0].Person_Last_Name);
                //   $('#Marital_Status_LOV_ID').val(row[0].Person_Last_Name);
                $('#Emergency_Contact_Name').val(row[0].Person_Last_Name);
                $('#Emergency_Contact_Number').val(row[0].Person_Last_Name);
                debugger;
                $('#Signature').val(row[0].Signature);
                var now_1 = new Date(row[0].Consent_Date);

                var day_1 = ("0" + now_1.getDate()).slice(-2);
                var month_1 = ("0" + (now_1.getMonth() + 1)).slice(-2);

                var today_1 = now_1.getFullYear() + "-" + (month_1) + "-" + (day_1);

                $('#Consent_Date').val(today_1);

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

    $.ajax({
        url: baseUrl + '/api/Patient',
        data: JSON.stringify({
            Patient: {

                MR_No: $('#MR_No').val(),
                Country_ID: $('#Patient_Country_ID').val(),
                Web_Portal_Access: $('input[name="WPA"]:checked').val(),// $('#Web_Portal_Access').val(),
                Primary_Care_Provider: $('#Primary_Care_Provider').val(),
                Preferred_Provider: $('#Preferred_Provider').val(),
                OptionalField_1: $('#OptionalField_1').val(),
                OptionalField_2: $('#OptionalField_2').val(),
                OptionalField_3: $('#OptionalField_3').val(),
                OptionalField_4: $('#OptionalField_4').val(),
                OptionalField_5: $('#OptionalField_5').val(),
                Entered_Date: new Date($.now()),
                Entered_By: 2,
                Audit_Date: new Date($.now()),
                Audit_By: 3,
                Last_Visit_Date: new Date($.now())
            },
            Person: {

                SSN: $('#SSN').val(),
                CNIC: $('#CNIC').val(),
                Date_of_Birth: $('#Date_of_Birth').val(),
                Person_First_Name: $('#Person_First_Name').val(),
                Person_Middle_Name: $('#Person_Middle_Name').val(),
                Person_Last_Name: $('#Person_Last_Name').val(),
                Father_Name: $('#Father_Name').val(),
                Person_Name_Prefix_LOV_ID: $('#Person_Name_Prefix_LOV_ID').val(),

                Gender_LOV_ID: $('#Gender_LOV_ID').val(),
                Marital_Status_LOV_ID: $('#Marital_Status_LOV_ID').val(),
                Emergency_Contact_Name: $('#Emergency_Contact_Name').val(),
                Emergency_Contact_Number: $('#Emergency_Contact_Number').val(),

                Entered_Date: new Date($.now()),
                Entered_By: 2,
                Audit_Date: new Date($.now()),
                Audit_By: 3,
                Last_Visit_Date: new Date($.now())

            }

        }),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');

            setTimeout(function () {
                debugger;
                med.notify_info("Record Saved Successfully.")
            });

            $('#PatientList').DataTable().ajax.reload();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(Patient_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/Patient/' + Patient_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreatePatient').data('url');

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

    $.ajax({
        url: baseUrl + '/api/Patient',
        data: JSON.stringify({
            Patient: {

                MR_No: $('#MR_No').val(),
                Country_ID: $('#Patient_Country_ID').val(),
                Web_Portal_Access: $('input[name="WPA"]:checked').val(),// $('#Web_Portal_Access').val(),
                Primary_Care_Provider: $('#Primary_Care_Provider').val(),
                Preferred_Provider: $('#Preferred_Provider').val(),
                OptionalField_1: $('#OptionalField_1').val(),
                OptionalField_2: $('#OptionalField_2').val(),
                OptionalField_3: $('#OptionalField_3').val(),
                OptionalField_4: $('#OptionalField_4').val(),
                OptionalField_5: $('#OptionalField_5').val(),
                Tenant_ID: $('#Tenant_ID').val(),
                Patient_ID: $('#Patient_ID').val(),
                Person_ID: $('#Person_ID').val(),
                Entered_Date: new Date($.now()),
                Entered_By: 2,
                Audit_Date: new Date($.now()),
                Audit_By: 3,
                Last_Visit_Date: new Date($.now())
            },
            Person: {

                SSN: $('#SSN').val(),
                CNIC: $('#CNIC').val(),
                Date_of_Birth: $('#Date_of_Birth').val(),
                Person_First_Name: $('#Person_First_Name').val(),
                Person_Middle_Name: $('#Person_Middle_Name').val(),
                Person_Last_Name: $('#Person_Last_Name').val(),
                Father_Name: $('#Father_Name').val(),
                Person_Name_Prefix_LOV_ID: $('#Person_Name_Prefix_LOV_ID').val(),

                Gender_LOV_ID: $('#Gender_LOV_ID').val(),
                Marital_Status_LOV_ID: $('#Marital_Status_LOV_ID').val(),
                Emergency_Contact_Name: $('#Emergency_Contact_Name').val(),
                Emergency_Contact_Number: $('#Emergency_Contact_Number').val(),

                Tenant_ID: $('#Tenant_ID').val(),
                Patient_ID: $('#Patient_ID').val(),
                Person_ID: $('#Person_ID').val(),
                Entered_Date: new Date($.now()),
                Entered_By: 2,
                Audit_Date: new Date($.now()),
                Audit_By: 3,
                Last_Visit_Date: new Date($.now())

            }

        }),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');

            $('#PatientList').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    var dataObj = {
        Patient_ID: $('#Patient_ID').val(),
        Person_ID: $('#Person_ID').val()

    };
    med.message_confirm(
        "Patient  will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/Patient/',
                    data: JSON.stringify(dataObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        $('#Patient_ID').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                    }
                });
            }
        }
    );



}
//Accept
function AcceptData() {
    var FormData = {
        Patient_ID: $('#Patient_ID').val(),
        Consent_Date: $('#Consent_Date').val(),
        Signature: $('#Signature').val()

    };
    $.ajax({
        url: baseUrl + "/api/Patient/Accept",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(FormData),
        success: function (response) {
            debugger;
           
            setTimeout(function () {
                debugger;
                med.notify_info("Record Accepted Successfully.")
            });

           
        },
        error: function (errorThrown) {

            console.log(errorThrown);
        }
    });
}


//Function for clearing the textboxes
function clearTextBox() {
    $('#Patient_ID').val("");
    $('#Tenant_ID').val("");
    $('#Person_ID').val("");
    $('#MR_No').val("");
    $('#Patient_Country_ID').val("");
    $('#SSN').val("");
    $('#CNIC').val("");
    $('#Web_Portal_Access').val("");
    $('#Primary_Care_Provider').val("");
    $('#OptionalField_1').val("");
    $('#OptionalField_2').val("");
    $('#OptionalField_3').val("");
    $('#OptionalField_4').val("");
    $('#OptionalField_5').val("");
    $('#Date_of_Birth').val(""),
        $('#Person_First_Name').val(""),
        $('#Person_Middle_Name').val(""),
        $('#Person_Last_Name').val(""),
        $('#Father_Name').val(""),
        $('#Person_Name_Prefix_LOV_ID').val(""),
        $('#Gender_LOV_ID').val(""),
        $('#Marital_Status_LOV_ID').val(""),
        $('#Emergency_Contact_Name').val(""),
        $('#Emergency_Contact_Number').val(""),



        $('#btnUpdate').hide();
    $('#btnAdd').show();


}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#MR_No').val().trim() == "") {
        $('#MR_No').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MR_No').css('border-color', 'lightgrey');
    }
    if ($('#Patient_Country_ID').val().trim() == "Choose One") {
        $('#Patient_Country_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Patient_Country_ID').css('border-color', 'lightgrey');
    }
    if ($('#Person_First_Name').val().trim() == "") {
        $('#Person_First_Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Person_First_Name').css('border-color', 'lightgrey');
    }
    if ($('#Patient_Country_ID').val().trim() == "167" && $('#CNIC').val() == "") {
        $('#CNIC').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CNIC').css('border-color', 'lightgrey');
    }
    if ($('#Patient_Country_ID').val().trim() == "United States" && $('#SSN').val() == "") {
        $('#SSN').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SSN').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for Get_DI
function Get_DI(Person_Doc_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/PersonDocuments/' + Person_Doc_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateDI').data('url');

            openPopup_DI(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}


var openPopup_DI = function (url, id, row, flag) {
    debugger;
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#DIModalContent').html(data);
            $('#DIModal').modal(options);
            $('#DIModal').modal('show');

            HideShowTab(flag, "DI");
          
            if (flag == "Update" || flag == "Delete") {
                debugger;
                $('#Tenant_ID').val(row[0].Tenant_ID);
                $('#Person_ID').val(row[0].Person_ID);
                $('#Person_Doc_ID').val(row[0].Person_Doc_ID);
                $('#Doc_Description').val(row[0].Doc_Description);

                Load_Combo_LOV("DocumentType", "#Doc_Type_LOV_ID", row[0].Doc_Type_LOV_ID);

               // $('#Doc_Type_LOV_ID').val(row[0].Doc_Type_LOV_ID);
                $('#Doc_Details').val(row[0].Doc_Details);

                var now = new Date(row[0].Doc_Expiry_Date);

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $('#Doc_Expiry_Date').val(today);

            }

        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });


};




//Function for Get_II
function Get_II(Patient_Coverage_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/PatientCoverage/' + Patient_Coverage_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateII').data('url');

            openPopup_II(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}


var openPopup_II = function (url, id, row, flag) {
    debugger;
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#IIModalContent').html(data);
            $('#IIModal').modal(options);
            $('#IIModal').modal('show');

            HideShowTab(flag, "II");

            if (flag == "Update" || flag == "Delete") {
                debugger;
             
                $('#Patient_Coverage_ID').val(row[0].Patient_Coverage_ID);
                $('#Patient_ID').val(row[0].Patient_ID);
                $('#Coverage_Notes').val(row[0].Coverage_Notes);
                $('#Coverage_Zip_Code').val(row[0].Coverage_Zip_Code);
                $('#Gaurantor_Name').val(row[0].Gaurantor_Name);


                Load_Combo_LOV("CoverageType", "#Mode_of_Coverage_LOV_ID", row[0].Mode_of_Coverage_LOV_ID);
                Load_Combo_LOV("CoverageType", "#Coverage_Type_LOV_ID", row[0].Coverage_Type_LOV_ID);
                Load_Combo_LOV("CoverageType", "#Coverage_Provider_LOV_ID", row[0].Coverage_Provider_LOV_ID);
                Load_Combo_LOV("CoverageType", "#Gaurantor_Relation_LOV_ID", row[0].Gaurantor_Relation_LOV_ID);
                Load_Combo_LOV("CoverageType", "#Coverage_Plan_LOV_ID", row[0].Coverage_Plan_LOV_ID);

                Load_Combo_Country("#Coverage_Country_ID", row[0].Coverage_Country_ID);
                Load_Combo_State("#Coverage_State_ID", row[0].Coverage_State_ID);
                Load_Combo_City("#Coverage_City_ID", row[0].Coverage_City_ID);

                $('#' + row[0].Coverage_Verified).prop('checked', true);

               
                var now = new Date(row[0].Coverage_Expiry_Date);

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $('#Coverage_Expiry_Date').val(today);

                var now_1 = new Date(row[0].Gaurantor_DOB);

                var day_1 = ("0" + now_1.getDate()).slice(-2);
                var month_1 = ("0" + (now_1.getMonth() + 1)).slice(-2);

                var today_1 = now.getFullYear() + "-" + (month_1) + "-" + (day_1);

                $('#Gaurantor_DOB').val(today_1);

            }

        },
        error: function () {
            console.log("Dynamic content load failed.");
        }
    });


};



//Function for Get_CI
function Get_CI(Person_Address_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/Person_Address/' + Person_Address_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
           var url = $('#CreateCI').data('url');
           

            openPopup_CI(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}


var openPopup_CI = function (url, id, row, flag) {
    debugger;
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            debugger;
            var $buttonClicked = $(this);
            var id = $buttonClicked.attr('data-id');
            var options = { "backdrop": "static", keyboard: true };
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                data: { "Id": id },
                datatype: "json",
                success: function (data) {
                    $('#partialViewContent').html(data);
                    $('#CIModal').modal('show');

                },
                error: function () {
                    alert("Dynamic Address content load failed.");
                }
            });

            //$('#CIModalContent').html(data);
            //$('#CIModal').modal(options);
            //$('#CIModal').modal('show');

            HideShowTab(flag, "CI");

            if (flag == "Update" || flag == "Delete") {
                debugger;
                Get_Address(row[0].Address_ID);


                $('#CI_Person_Address_ID').val(row[0].Person_Address_ID);
                $('#CI_Person_ID').val(row[0].Person_ID);
                $('#CI_Tenant_ID').val(row[0].Tenant_ID);
                $('#CI_Address_ID').val(row[0].Address_ID);
               

            }

        },
        error: function () {
            console.log("Dynamic content load failed.");
        }
    });


};