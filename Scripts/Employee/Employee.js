"use strict";
var EmployeeTable = function () {

    var initTable1 = function () {
        var table = $('#Employee_List');

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
                url: baseUrl + '/api/Employee',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (data) {
                  
                    return data;
                },

                //success: function (response) {
                //    debugger
                //    console.log(response);
                //    return response;
                //}    

                error: function (responseText) {
                    
                    alert(responseText.responseText);
                }
                
            },

            columns: [
                { data: null, responsivePriority: 0, defaultContent: ""},
                { data: 'Employee_ID', title: 'Emp#', defaultContent: "" },
                { data: 'Image', title: 'Image', defaultContent: ""},
                { data: 'Person_Full_Name', title: 'Employee Name', defaultContent: "" },
                { data: 'Date_of_Birth', title: 'DOB', defaultContent: ""},
                { data: 'Date_of_Joining', title: 'DOJ', defaultContent: ""},
                { data: 'LOV_Text', title: 'Designation', defaultContent: ""},
                { data: 'Speciality_Clinic_Description', title: 'Speciality Clinic', defaultContent: "" }
            ],

            columnDefs: [
			    {
                    targets: 2,
                    title: 'Image',
                    orderable: false,
                    visible: false
                },
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100, class: 'dt-center',
                    data: null,
                    render: function (data, type, row, meta) {
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
                                                                <a class="dropdown-item" href="#" onclick="getbyID(` + data[1] +
                            `)"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-trash" ></i>Delete</a>
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },


                //{
                //    targets: 8,

                //    render: function (data, type, full, meta) {
                //        //var status = {
                //        //    1: { 'title': 'Active', 'state': 'primary' },
                //        //    2: { 'title': 'Inactive', 'state': 'brand' },

                //        //};
                //        //if (typeof status[data] === 'undefined') {

                //        //    return data;
                //        //}

                //        //return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
                //        //    '<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';

                //        var status = {

                //            A: { 'title': 'Active', 'class': ' kt-badge--success' },
                //            U: { 'title': 'Inactive', 'class': ' kt-badge--danger' },


                //        };
                //        if (typeof status[data] === 'undefined') {
                //            return data;
                //        }
                //        return '<span style="width:100px;" class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                //    },
                //},
            ],
        });

        //$('#Employee_List').on('click', 'tbody a', function () {
        //    debugger;
        //    var $tr = $(this).closest('tr');
        //       var data = table.row($tr).data();
        //    console.log(data);
        //});

        $('#Employee_List').on('click', 'tbody a', function () {
            debugger;
            console.log(table.row($(this).parents('tr')));

            table
                .row($(this).parents('tr'))
                .remove()
                .draw();
        });
		
		var oTable = $('#Employee_List').DataTable();  
        $('#myInputTextField').keyup(function () {
            oTable.search($(this).val()).draw();
        });

    };
    var initTable_2 = function () {
        var table = $('#Employee_List_2');

        // begin first table
        table.DataTable({
            responsive: true,
            "bAutoWidth": false,
            "scrollX": false,
            dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

            lengthMenu: [5, 10, 25, 50],

            pageLength: 10,

            language: {
                'lengthMenu': 'Display _MENU_',
            },

            // Order settings
            order: [[1, 'desc']],


            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100, class: 'dt-center',
                    data: null,
                    render: function (data, type, row, meta) {
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
                                                                <a class="dropdown-item" href="#" onclick="getbyID(` + data[1] +
                            `)"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-trash" ></i>Delete</a>
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                },


                {
                    targets: 6,

                    render: function (data, type, full, meta) {
                        var status = {
                            1: { 'title': 'Active', 'state': 'primary' },
                            2: { 'title': 'Inactive', 'state': 'primary' },

                        };
                        if (typeof status[data] === 'undefined') {

                            return data;
                        }

                        return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
                            '<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';
                    },
                },
            ],
        });

        $('#Employee_List_2').on('click', 'tbody a', function () {
            debugger;
            var $tr = $(this).closest('tr');
            var data = table.row($tr).data();
            console.log(data);
        });

    };
    var initTable_3 = function () {
        var table = $('#Employee_List_3');

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


            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100, class: 'dt-center',
                    data: null,
                    render: function (data, type, row, meta) {
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
                                                                <a class="dropdown-item" href="#" onclick="getbyID(` + data[1] +
                            `)"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
                                                                        class="fa fa-trash" ></i>Delete</a>
                                                            </div>
                                                        </div>
                       
                        `;
                    },
                }
            ],
        });

        $('#Employee_List_3').on('click', 'tbody a', function () {
            debugger;
            var $tr = $(this).closest('tr');
            var data = table.row($tr).data();
            console.log(data);
        });

    };
    var initTable_Consultant = function () {
        var table = $('#List_Consultant');

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


            columnDefs: [
                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100,
                    class: 'dt-center',
                    data: null,
                    render: function (data, type, row, meta) {
                        console.log(data);
                        return `
                           <div class="dropdown">
                                  <button class="btn btn-outline-brand dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" href="#" onclick="getbyID(` + data[1] + `)"><i class="fa fa-edit"></i> Edit</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-trash" ></i>Delete</a>
                                                            </div>
                                                        </div>`;
                    },
                },
                {
                    targets: 6,


                    render: function (data, type, full, meta) {
                        var Status = {

                            1: { 'title': 'Available', 'class': 'kt-badge--success' },
                            2: { 'title': 'Not Available', 'class': ' kt-badge--danger' },


                        };
                        if (typeof Status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="width:100px;" class="kt-badge ' + Status[data].class + ' kt-badge--inline kt-badge--pill">' + Status[data].title + '</span>';
                    },
                }
            ],
        });

        $('#List_Consultant').on('click', 'tbody a', function () {
            debugger;
            var $tr = $(this).closest('tr');
            var data = table.row($tr).data();
            console.log(data);
        });

    };
    return {

        //main function to initiate the module
        init: function () {
            initTable1();
            initTable_2();
            initTable_3();
            initTable_Consultant();
          
        },

    };

}();

var AddressTable = function () {
    var initTableAddress = function () {
        var table = $('#Address_List');

        // begin first table
        table.DataTable({

            "bAutoWidth": false,
            "searching": false,
            "paging": false,
            "info": false,


            columnDefs: [
                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false
                },

                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100, class: 'dt-center',
                    data: null,
                    render: function (data, type, row, meta) {
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
                                                                <a class="dropdown-item" href="#" onclick="getbyID(` + data[1] +
                            `)"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                                                <a class="dropdown-item" href="#"><i
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
            initTableAddress();

        },

    };

}();

function getbyID(EmpID) {
    debugger;
    alert(EmpID);



};


$("#CreateEmp").click(function () {
    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');

    openPopup(url, '', '', 'Create');
    
});
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
    var options = { "backdrop": "static", keyboard: false };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#CreateOrEditModalContent').html(data);
            $('#CreateOrEditModal').modal(options);
            $('#CreateOrEditModal').modal('show');

            //AddressTable.init();

            if (flag == "Update") {
                $('#Delete').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Update Tenant");

                $('#TenantId').val(row[0].Tenant_ID);
                $('#Description').val(row[0].Tenant_Desc);
                $('#Code').val(row[0].Tenant_Code);

                //$('#Contact_Person').val(row[0].Tenant_Contact_Person);
                //$('#Contact').val(row[0].Tenant_Contact);
            }
            else if (flag == "Create") {
                $('#Delete').hide();
                $('#Update').hide();
                $('#exampleModalLabel').text("Create Tenant");
            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Delete Tenant");

                $('#TenantId').val(row[0].Tenant_ID);
                $('#Description').val(row[0].Tenant_Desc);
                $('#Code').val(row[0].Tenant_Code);
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

    var empObj = {
        Employee_ID: $('#Employee_ID').val(),
        Employee_No: $('#Employee_No').val(),
        Name_Prefix: $('#Name_Prefix').val(),
        First_Name: $('#First_Name').val(),
        Middle_Name: $('#Middle_Name').val(),
        Last_Name: $('#Last_Name').val(),
        Suffix: $('#Suffix').val(),
        Date_of_Birth: $('#Date_of_Birth').val(),
        SSN: $('#SSN').val(),
        Gender: $('#Gender').val(),
        MartialStatus: $('#MartialStatus').val(),
        DefualtRale: $('#DefualtRale').val(),
        Designation: $('#Designation').val(),
        AssignClinic: $('#AssignClinic').val(),
        Status: $('#Status').val(),
        DefualtRale: $('#DefualtRale').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/employee',
        data: JSON.stringify(empObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');

            setTimeout(function () {
                med.notify_info("Record Saved Successfully.")
            });

            $('#Employee_List').DataTable().ajax.reload();
           


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(EmpID, flag) {
    $.ajax({
        url: baseUrl + '/api/tenant/' + EmpID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateTenant').data('url');
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
    var empObj = {
        Tenant_ID: $('#TenantId').val(),
        Tenant_Desc: $('#Description').val(),
        Tenant_Code: $('#Code').val(),
        Tenant_Contact_Person: $('#Contact_Person').val(),
        Tenant_Contact: $('#Contact').val(),
        Address_ID: 1,
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Tenant_Status: 1, //$('#chkActive').val(),
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    $.ajax({
        url: baseUrl + '/api/tenant',
        data: JSON.stringify(empObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');

            $('#TenantList').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delete() {
    // var ans = confirm("Are you sure you want to delete this Record?");
    var empObj = {
        Tenant_ID: $('#TenantId').val(),
        Tenant_Desc: $('#Description').val(),
        Tenant_Code: $('#Code').val(),
        Tenant_Contact_Person: $('#Contact_Person').val(),
        Tenant_Contact: $('#Contact').val(),
        Address_ID: 1,
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Tenant_Status: 1, //$('#chkActive').val(),
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    med.message_confirm(
        "Tenant " + $('#Description').val() + " will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/tenant/',
                    data: JSON.stringify(empObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#TenantList').DataTable().ajax.reload();
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
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    if ($('#Code').val().trim() == "") {
        $('#Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Code').css('border-color', 'lightgrey');
    }
    if ($('#Contact_Person').val().trim() == "") {
        $('#Contact_Person').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Contact_Person').css('border-color', 'lightgrey');
    }
    if ($('#Contact').val().trim() == "") {
        $('#Contact').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubscriptionEnd').css('border-color', 'lightgrey');
    }
    return isValid;
}




//Address Table Initialization
var AddressTable = function () {
    var initTableAddress = function () {
        var table = $('#Address_List');

        // begin first table
        table.DataTable({

            "bAutoWidth": false,
            "searching": false,
            "paging": false,
            "info": false,


            columnDefs: [
                {
                    targets: 1,
                    visible: false,

                },

                {
                    targets: 3,
                    visible: false,

                },

                {
                    targets: 4,
                    visible: false,

                },

                {
                    targets: 5,
                    visible: false,

                },

                {
                    targets: 6,
                    visible: false,

                },
                {
                    targets: 8,
                    visible: false,

                },

                {
                    targets: 9,
                    visible: false,

                },

                {
                    targets: 10,
                    visible: false,
                    searchable: false
                },

                {
                    targets: [11],
                    visible: false,

                },

                {
                    targets: 0,
                    title: 'Actions',
                    orderable: false,
                    width: 100,
                    class: 'dt-center',
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `

                               <button class="btn btn-info" href="#"><i class="fa fa-trash" ></i>Delete</button>
                                                          
                       
                        `;
                    },
                },



            ],
        });

        $('#Address_List').on('click', 'button', function () {
            var pageParamTable = $('#Address_List').DataTable();
            var tableRow = pageParamTable.row($(this).parents('tr'));
            pageParamTable.row(tableRow).remove().draw();
        });



    };




    return {

        //main function to initiate the module
        init: function () {
            initTableAddress();

        },

    };

}();
//Address Popup Working
var OpenAddressPopup = function () { 
    var $buttonClicked = $("#addAddress");
    var url = $("#addAddress").data('url');
    var id = $buttonClicked.attr('data-id');

    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#AddressModalContent').html(data);
            $('#AddressModal').modal(options);
            $('#AddressModal').modal('show');
        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });

};
var CloseAddressPopup = function () {
    $('#AddressModal').modal('toggle');
};
// Add rows in Address table
var AddAddressDataToGrid = function () {
   
    var objData = {};

    objData["Address_Line_1"] = $('#Address_Line_1').val();
    objData["Address_Line_2"] = $('#Address_Line_2').val();
    objData["Address_Line_3"] = $('#Address_Line_3').val();
    objData["Address_Contact_Type1_LOV_ID"] = $('#Address_Contact_Type1_LOV_ID').val();
    objData["Address_Contact_Type1_LOV_Text"] = $('#Address_Contact_Type1_LOV_ID option:selected').text();
    objData["Address_Contact_1"] = $('#Address_Contact_1').val();
    objData["Address_Contact_Type2_LOV_ID"] = $('#Address_Contact_Type2_LOV_ID').val();
    objData["Address_Contact_Type2_LOV_Text"] = $('#Address_Contact_Type2_LOV_ID option:selected').text();
    objData["Address_Contact_2"] = $('#Address_Contact_2').val();
    objData["Address_Email_1"] = $('#Address_Email_1').val();
    objData["Address_Email_2"] = $('#Address_Email_2').val();
    objData["Country_ID"] = $('#Country_ID').val();
    objData["Country_Text"] = $('#Country_ID option:selected').text();
    objData["State_ID"] = $('#State_ID').val();
    objData["State_Text"] = $('#State_ID option:selected').text();
    objData["City_ID"] = $('#City_ID').val();
    objData["City_Text"] = $('#City_ID option:selected').text();
    objData["Postal_Zip_Code"] = $('#Postal_Zip_Code').val();
    objData["Address_ID"] = $('#Address_ID').val();
    $('#AddressModal').modal('hide');

    fnAddRowAddressTable(objData);
};
function fnAddRowAddressTable(row) {
    $('#Address_List').dataTable().fnAddData([
        null,
        row.Address_ID,
        row.Address_Line_1,
        row.Address_Line_2,
        row.Address_Line_3,
        row.Address_Contact_Type1_LOV_ID,
        row.Address_Contact_Type1_LOV_Text,
        row.Address_Contact_1,
        row.Address_Contact_Type2_LOV_ID,
        row.Address_Contact_Type2_LOV_Text,
        row.Address_Contact_2,
        row.Address_Email_1,
        row.Address_Email_2,
        row.Country_ID,
        row.Country_Text,
        row.State_ID,
        row.State_Text,
        row.City_ID,
        row.City_Text,
        row.Postal_Zip_Code





    ]);
}

//Education Table Initialization
var EducationTable = function () {
    var initTableEdcucation = function () {
        var table = $('#Education_Table');

        // begin first table
        table.DataTable({

            "bAutoWidth": false,
            "searching": false,
            "paging": false,
            "info": false,


            columnDefs: [
                
                {
                    targets: 1,
                    title: 'Education_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 2,
                    title: 'Tenant_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 3,
                    title: 'Persons_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },

                {
                    targets: 4,
                    title: 'Qualification_Cadre_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 0,
                    title: 'Action',
                    orderable: false,
                    width: 100,
                    class: 'dt-center',
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `

                               <button class="btn btn-info" href="#"><i class="fa fa-trash" ></i>Delete</button>
                                                          
                       
                        `;
                    },
                },



            ],
        });


    };

    return {

        //main function to initiate the module
        init: function () {
            initTableEdcucation();

        },

    };

}();
//Eduction Popup Working
var openEducationPopup = function () { 
    var $buttonClicked = $("#addEducation");
    var url = $("#addEducation").data('url');
    var id = $buttonClicked.attr('data-id');

    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#EducationModalContent').html(data);
            $('#EducationModal').modal(options);
            $('#EducationModal').modal('show');
        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });

};
var CloseEducationPopup = function () {
    $('#EducationModal').modal('toggle');
};
// Add rows in Education table
var AddEducationDataToGrid = function () {
    debugger;
    var objData = {};
    objData["Persons_ID"] = 1
    objData["Tenant_ID"] = 1
    objData["Education_ID"] = 1
    objData["Qualification_Cadre"] = $('#Qualification_Cadre_Lov').val();
    objData["Qualification_Cadre_Text"] = $('#Qualification_Cadre_Lov option:selected').text();
    objData["DegreeTitle"] = $('#DegreeTitle').val();
    objData["Institute"] = $('#Institute').val();
    objData["Majors"] = $('#Majors').val();
    objData["Passing_Year"] = $('#Passing_Year').val();
    objData["Achievements"] = $('#Achievements').val();
    objData["Attachment"] = $('#Attachment').val();
    $('#EducationModal').modal('hide');
    fnAddRowEducationTable(objData);
};
function fnAddRowEducationTable(row) {
    debugger
    $('#Education_Table').dataTable().fnAddData([
        null,
        row.Education_ID,
        row.Tenant_ID,
        row.Persons_ID,
        row.Qualification_Cadre,
        row.Qualification_Cadre_Text,
        row.DegreeTitle,
        row.Institute,
        row.Majors,
        row.Passing_Year,
        row.Achievements,
        row.Attachment,
    ]);
}


//Experinace Table Initialization
var ExperianceTable = function () {
    var initTableExperiance = function () {
        var table = $('#Experiance_Table');

        // begin first table
        table.DataTable({

            "bAutoWidth": false,
            "searching": false,
            "paging": false,
            "info": false,


            columnDefs: [

                {
                    targets: 1,
                    title: 'Education_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 2,
                    title: 'Tenant_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 3,
                    title: 'Persons_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },

                {
                    targets: 4,
                    title: 'Qualification_Cadre_ID',
                    orderable: false,
                    visible: false,
                    class: 'dt-center',
                    searchable: false,

                },
                {
                    targets: 0,
                    title: 'Action',
                    orderable: false,
                    width: 100,
                    class: 'dt-center',
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `

                               <button class="btn btn-info" href="#"><i class="fa fa-trash" ></i>Delete</button>
                                                          
                       
                        `;
                    },
                },



            ],
        });


    };

    return {

        //main function to initiate the module
        init: function () {
            initTableExperiance();

        },

    };

}();
//Experiance Popup Working
var openExperiancePopup = function () {
    debugger;
    var $buttonClicked = $("#addExperiance");
    var url = $("#addExperiance").data('url');
    var id = $buttonClicked.attr('data-id');

    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('#ExperianceModalContent').html(data);
            $('#ExperianceModal').modal(options);
            $('#ExperianceModal').modal('show');
        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });

};
var CloseExperiancePopup = function () {
    $('#ExperianceModal').modal('toggle');
};
// Add rows in Experiance table
var AddExperianceDataToGrid = function () {
    debugger;
    var objData = {};
    objData["Persons_ID"] = 1
    objData["Tenant_ID"] = 1
    objData["Experiance_ID"] = 1
    objData["Occoupation_Nature"] = $('#Occoupation_Nature').val();
    objData["Occoupation_Nature_Text"] = $('#Occoupation_Nature option:selected').text();
    objData["Occoupation_Title"] = $('#Occoupation_Title').val();
    objData["Occoupation_Institute"] = $('#Occoupation_Institute').val();
    objData["Occoupation_Start_Date"] = $('#Occoupation_Start_Date').val();
    objData["Occoupation_End_Date"] = $('#Occoupation_End_Date').val();
    objData["Current_Occupation"] = $('#Current_Occupation').val();
    
    objData["Occupation_Attachment"] = $('#Occupation_Attachment').val();
    $('#ExperianceModal').modal('hide');
    fnAddRowExperianceTable(objData);
};
function fnAddRowExperianceTable(row) {
    debugger
    $('#Experiance_Table').dataTable().fnAddData([
        null,
        row.Experiance_ID,
        row.Tenant_ID,
        row.Persons_ID,
        row.Occoupation_Nature,
        row.Occoupation_Nature_Text,
        row.Occoupation_Title,
        row.Occoupation_Institute,
        row.Occoupation_Start_Date,
        row.Occoupation_End_Date,
        row.Current_Occupation,
        row.Occupation_Attachment
    ]);
}

jQuery(document).ready(function () {
    EmployeeTable.init();
   
    $('#List_Consultant_wrapper').css("width", "100%")
    $('#Employee_List_3_wrapper').css("width", "100%")
});




