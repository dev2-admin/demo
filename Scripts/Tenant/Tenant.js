"use strict";
var initilizeDataTable = function () {

    var initTable1 = function () {

        var table = $('#TenantList');

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
                url: baseUrl +'/api/tenant',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {
                    return jsonData;
                }
            },


            columns: [
                { data: null, responsivePriority: 0 },
                { data: 'Tenant_ID' },
                { data: 'Tenant_Desc' },
                { data: 'Tenant_Code'},
                { data: 'Entered_By' },
                { data: 'Entered_Date' },
                { data: 'Audit_Date' },
                { data: 'Audit_By' },
                
            ],

            columnDefs: [

                {
                    targets: 1,
                    title: 'Actions',
                    orderable: false,
                    visible : false
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
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Tenant_ID +`, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Tenant_ID +`, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div>

                        `;
                    },
                },
            ],


        });
		       
		var oTable = $('#TenantList').DataTable();  
        $('#myInputTextField').keyup(function () {
            oTable.search($(this).val()).draw();
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
    $("#TenantList_wrapper").css("width", "100%")
    
});


/*
function LoadData() {
    
    $.ajax({
        url: 'http://localhost/MED360_WEBAPI_C/api/tenant',
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
       
        success: function (data) {
            console.log(JSON.stringify(data));
    


            $('#TenantList').DataTable({
                
                data: data,

                columnDefs: [
                    {
                        targets: -1,
                        title: 'Actions',
                        orderable: false,


                        render: function (data, type, full, meta) {
                            console.log(data);
                            return `
                        <span class="dropdown">
                            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" id="Edit" href="javascript:void(0);" ><i class="la la-edit"></i>Edit</a>
                                <a class="dropdown-item"  href="#"><i class="la la-trash"></i>Delete</a>
                            </div>
                        </span>
                        `;
                        },
                    },
                ],

                columns: [
                    { data: 'Tenant_ID' },
                    { data: 'Tenant_Desc' },
                    {
                        data: 'Tenant_Code'
                    },
                    { data: 'Entered_By' },
                    { data: 'Entered_Date' },
                    { data: 'Audit_Date' },
                    { data: 'Audit_By' },
                    { data: 'Actions', responsivePriority: -1 },
                ],

            });
        },
        failure: function (response) {
            console.log(response);
        }
    });
};
*/



$("#CreateTenant").click(function () {
    debugger;
        var $buttonClicked = $(this);
        var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');

    openPopup(url, '', '', 'Create');
    //var options = { "backdrop": "static", keyboard: true };
    //$.ajax({
    //    type: "GET",
    //    url: url,
    //    success: function (data) {
    //        $('#LovContent').html(data);
    //        $('#LovPopup').modal(options);
    //        $('#LovPopup').modal('show');

          
    //        LoadLovpopup("Tenants");


    //    },
    //    error: function () {
    //        alert("Dynamic content load failed.");
    //    }
    //});
    

      
    });
// funtion for open popup modal for Create, Update and Delete
var openPopup = function (url, id, row, flag) {
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
        Tenant_ID: $('#TenantId').val(),
        Tenant_Desc: $('#Description').val(),
        Tenant_Code: $('#Code').val(),
        Tenant_Contact_Person: $('#Contact_Person').val(),
        Tenant_Contact: $('#Contact').val(),
        Address_ID: 1,
        Entered_Date: new Date($.now()),
        Entered_By:2,
        Tenant_Status:1, //$('#chkActive').val(),
        Audit_Date: new Date($.now()),
        Audit_By:3
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/tenant',
        data: JSON.stringify(empObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');

            setTimeout(function () {
                med.notify_info("Record Saved Successfully.")
                
                //med.message.info("Record Saved Successfully.")
                //Swal.fire({
                //    position: 'bottom-end',
                //    icon: 'success',
                //    title: 'Record Saved Successfully',
                //    showConfirmButton: false,
                //    timer: 1500
                //})
            });

            $('#TenantList').DataTable().ajax.reload();
            //$("#SuccessMessage").show();
            
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(EmpID, flag) {
    $.ajax({
        url: baseUrl + '/api/tenant/' + EmpID ,
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