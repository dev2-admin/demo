"use strict";
var NotionTable = function () {

    var initTable1 = function () {
        var table = $('#Notion_List');

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
            ajax: {
                
                url: baseUrl + '/api/Notion_By_Type/Allergies',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {

                    return jsonData;
                }
            },
            // Order settings
            order: [[1, 'desc']],

  



            columns: [

                { data: null, responsivePriority: 0 },
                { data: 'Notion_ID' },
                { data: 'Notion_Name' },
                { data: 'Notion_Description' },
         

                { data: 'LOV_Text' },
                { data: 'N_Status' },
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
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Notion_ID + `, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.Notion_ID + `, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div>

                        `;
                    },
                },
            ],
        });
        var oTable = $('#Notion_List').DataTable();
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
    NotionTable.init();

});


function Load_Combo_LOV(seletedValue) {
 
    $.ajax({
        url: baseUrl + "/api/lov/AllergyType",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',

        async:false,




        //  data: JSON.stringify(provinceName),
        success: function (response) {

            var len = response.length;


            $.each(response, function () {
                $("#Notion_LOV1_ID").append($("<option     />").val(this.LOV_ID).text(this.LOV_Text));
            });


            if (seletedValue != undefined) {
               
                $('#Notion_LOV1_ID').val(seletedValue);
            }


        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function Load_Combo_Status(seletedtext) {
 
    $.ajax({
        url: baseUrl + "/api/Notion",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',

        //  data: JSON.stringify(provinceName),
        success: function (response) {

            var len = response.length;


            //$.each(response, function () {
            //    //$("#Notion_Status").append($("<option     />").text(this.Notion_Status));
            //    $("#Notion_Status").append($("<option     />").val(this.Notion_Status));
            //});


            if (seletedtext != undefined) {
            
                $('#Notion_Status').val(seletedtext);
            }


        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

$("#CreateAllergy").click(function () {

    var $buttonClicked = $(this);
    var url = $(this).data('url');
    var id = $buttonClicked.attr('data-id');

    openPopup(url, id, '', "Create");
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
                $('#exampleModalLabel').text("Update");
             
                $('#Notion_ID').val(row[0].Notion_ID);
                $('#Notion_Name').val(row[0].Notion_Name);
                $('#Notion_Description').val(row[0].Notion_Description);


                Load_Combo_LOV(row[0].Notion_LOV1_ID);
                Load_Combo_Status(row[0].Notion_Status);
                //$('#Notion_Status').val(row[0].Notion_Status);

            }
            else if (flag == "Create") {
                $('#Delete').hide();
                $('#Update').hide();
                $('#exampleModalLabel').text("Create");

                Load_Combo_LOV("");

            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Delete");

                $('#Notion_ID').val(row[0].Notion_ID);
                $('#Notion_Name').val(row[0].Notion_Name);
                $('#Notion_Description').val(row[0].Notion_Description);


                Load_Combo_LOV(row[0].Notion_LOV1_ID);
                Load_Combo_Status(row[0].Notion_Status);

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




    var NotionObj = {
        
        Tenant_ID: 4,
        Notion_ID: $('#Notion_ID').val(),
        Notion_Name: $('#Notion_Name').val(),
        Notion_Description: $('#Notion_Description').val(),
        Notion_LOV1_ID: $('#Notion_LOV1_ID').val(),
        Notion_Status: $('#Notion_Status').val(),
        Notion_Code:"N/A",
        Notion_Class_ID: 92,
        OptionalField_1: "N/A",
        OptionalField_2: "N/A",
        OptionalField_3: "N/A",
        OptionalField_4: "N/A",
        OptionalField_5: "N/A",
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/Notion',
        data: JSON.stringify(NotionObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
        
            console.log(result);
            $('#myModal').modal('hide');

            $('#Notion_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon State ID
function getbyID(Notion_ID, flag) {

    $.ajax({
        url: baseUrl + '/api/Notion/' + Notion_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateAllergy').data('url');

            openPopup(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for updating State's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }



    var NotionObj = {

        Tenant_ID: 4,
        Notion_ID: $('#Notion_ID').val(),
        Notion_Name: $('#Notion_Name').val(),
        Notion_Description: $('#Notion_Description').val(),
        Notion_LOV1_ID: $('#Notion_LOV1_ID').val(),
        Notion_Status: $('#Notion_Status').val(),
        Notion_Code: "N/A",
        Notion_Class_ID: 92,
        OptionalField_1: "N/A",
        OptionalField_2: "N/A",
        OptionalField_3: "N/A",
        OptionalField_4: "N/A",
        OptionalField_5: "N/A",
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    $.ajax({
        url: baseUrl + '/api/Notion',
        data: JSON.stringify(NotionObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          
            console.log(result);
            $('#myModal').modal('hide');

            $('#Notion_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

//function for deleting STate's record
function Delete() {


    // var ans = confirm("Are you sure you want to delete this Record?");
    var NotionObj = {

        Tenant_ID: 4,
        Notion_ID: $('#Notion_ID').val(),
        Notion_Name: $('#Notion_Name').val(),
        Notion_Description: $('#Notion_Description').val(),
        Notion_LOV1_ID: $('#Notion_LOV1_ID').val(),
        Notion_Status: $('#Notion_Status').val(),
        Notion_Code: "N/A",
        Notion_Class_ID: 92,
        OptionalField_1: "N/A",
        OptionalField_2: "N/A",
        OptionalField_3: "N/A",
        OptionalField_4: "N/A",
        OptionalField_5: "N/A",
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    med.message_confirm(
        "Allergy " + "Waleed" + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/Notion/',
                    data: JSON.stringify(NotionObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#Notion_List').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                        $('#Notion_List').DataTable().ajax.reload();
                    }
                });
            }
        }
    );



}
//Function for clearing the textboxes

function clearTextBox() {
    $('#Notion_ID').val("");
    $('#Notion_Name').val("");
    $('#Notion_LOV1_ID').val("");
    $('#Notion_Description').val("");
    $('#Notion_Status').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Notion_ID').css('border-color', 'lightgrey');
    $('#Notion_Name').css('border-color', 'lightgrey');
    $('#Notion_LOV1_ID').css('border-color', 'lightgrey');
    $('#Notion_Description').css('border-color', 'lightgrey');
    $('#Notion_Status').css('border-color', 'lightgrey');
}
    //Valdidation using jquery

    function validate() {
        debugger;
        var isValid = true;
        if ($('#Notion_Name').val().trim() == "") {
            $('#Notion_Name').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Notion_Name').css('border-color', 'lightgrey');
        }
        if ($('#Notion_LOV1_ID').val().trim() == "") {
            $('#Notion_LOV1_ID').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Notion_LOV1_ID').css('border-color', 'lightgrey');
        }
        if ($('#Notion_Description').val().trim() == "") {
            $('#Notion_Description').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Notion_Description').css('border-color', 'lightgrey');
        }
        if ($('#Notion_Status').val().trim() == "") {
            $('#Notion_Status').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Notion_Status').css('border-color', 'lightgrey');
        }
        return isValid;
    }
