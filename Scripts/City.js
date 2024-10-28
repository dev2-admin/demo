"use strict";
var CountryTable = function () {

    var initTable1 = function () {
        var table = $('#City_List');

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
                url: baseUrl + '/api/City',
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                dataSrc: function (jsonData) {

                    return jsonData;
                }
            },
            // Order settings
            order: [[2, 'asc']],
            
            columns: [

                { data: null, responsivePriority: 0 },
                { data: 'City_ID' },
                { data: 'City_Name' },
                { data: 'State_ID' },
                { data: 'State_Name' },
               
          
                { data: 'City_Description' },
                { data: 'City_Short_Code' },
                //{ data: 'Entered_By' },
                //{ data: 'Entered_Date' },
                //{ data: 'Audit_Date' },
                //{ data: 'Audit_By' },

            ],
            columnDefs: [
				{
                    targets: 1,
                    title: 'City_ID',
                    orderable: false,
                    visible : false
                },
				{
                    targets: 3,
                    title: 'State_ID',
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
                                                                <a class="dropdown-item" href="#" onClick="getbyID(`+ data.City_ID + `, 'Update');return false;"><i
                                                                        class="fa fa-edit"></i> Edit</a>
                                                               
                                    <a class="dropdown-item" href="#" onClick="getbyID(`+ data.City_ID + `, 'Delete');return false;"><i
class="fa fa-trash" ></i>Delete</a>
                                 </div>
                                </div>

                        `;
                    },
                },
            ],
        });
        var oTable = $('#City_List').DataTable();
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
    CountryTable.init();

});


function Load_Combo_City(seletedValue) {
    debugger;
    $.ajax({
        url: baseUrl + "/api/City",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',






        //  data: JSON.stringify(provinceName),
        success: function (response) {

            var len = response.length;


            $.each(response, function () {
                $("#State_ID").append($("<option     />").val(this.State_ID).text(this.State_Name));
            });


            if (seletedValue != undefined) {

                $('#State_ID').val(seletedValue);
            }


        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}


$("#CreateCity").click(function () {
    debugger;
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
        
                $('#City_ID').val(row[0].City_ID);


                Load_Combo_City(row[0].State_ID);


                $('#City_Name').val(row[0].City_Name);
                $('#City_Description').val(row[0].City_Description);
                $('#City_Short_Code').val(row[0].City_Short_Code);


            }
            else if (flag == "Create") {
                $('#Delete').hide();
                $('#Update').hide();
                $('#exampleModalLabel').text("Create");
              
            }
            else {
                $('#Update').hide();
                $('#SaveChanges').hide();
                $('#exampleModalLabel').text("Delete");


                $('#City_ID').val(row[0].City_ID);


                Load_Combo_City(row[0].State_ID);


                $('#City_Name').val(row[0].City_Name);
                $('#City_Description').val(row[0].City_Description);
                $('#City_Short_Code').val(row[0].City_Short_Code);


            }



        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    });


};
//Add Data Function
function Add() {
    debugger;
    var $buttonClicked = $('#SaveChanges');
    var url = $buttonClicked.data('url');
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
   
    
    var CityObj = {
        
        City_ID: $('#City_ID').val(),
        City_Name: $('#City_Name').val(),
        State_ID: $('#State_ID').val(),
        City_Description: $('#City_Description').val(),
        City_Short_Code: $('#City_Short_Code').val(),
   
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };

    //$('#myModal').modal('hide');
    $.ajax({
        url: baseUrl + '/api/City',
        data: JSON.stringify(CityObj),
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadData();
            $('#myModal').modal('hide');


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon State ID
function getbyID(City_ID, flag) {
    debugger;
    $.ajax({
        url: baseUrl + '/api/City/' + City_ID,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var url = $('#CreateCity').data('url');

            openPopup(url, '', result, flag)

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
//function for updating State's record
function Update() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}


    var CityObj = {

        City_ID: $('#City_ID').val(),
        City_Name: $('#City_Name').val(),
        State_ID: $('#State_ID').val(),
        City_Description: $('#City_Description').val(),
        City_Short_Code: $('#City_Short_Code').val(),

        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    $.ajax({
        url: baseUrl + '/api/City',
        data: JSON.stringify(CityObj),
        type: "Put",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result);
            $('#myModal').modal('hide');

            $('#City_List').DataTable().ajax.reload();

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

//function for deleting STate's record
function Delete() {


    // var ans = confirm("Are you sure you want to delete this Record?");
    var CityObj = {
        City_ID: $('#City_ID').val(),
        State_ID: $('#State_ID').val(),
        City_Description: $('#City_Description').val(),
        State_Description: $('#State_Description').val(),
        City_Short_Code: $('#City_Short_Code').val(),
        Entered_Date: new Date($.now()),
        Entered_By: 2,
        Audit_Date: new Date($.now()),
        Audit_By: 3
    };
    med.message_confirm(
        "City " + "Waleed" + "will be deleted",
        "Are You Sure",
        (isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: baseUrl + '/api/City/',
                    data: JSON.stringify(CityObj),
                    type: "DELETE",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        $('#myModal').modal('hide');
                        //initilizeDataTable.init();
                        $('#City_List').DataTable().ajax.reload();
                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                        $('#City_List').DataTable().ajax.reload();
                    }
                });
            }
        }
    );



}
//Function for clearing the textboxes

function clearTextBox() {
    $('#City_ID').val("");
    $('#City_Name').val("");
    $('#State_ID').val("");
    $('#City_Description').val("");
    $('#City_Short_Code').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#City_ID').css('border-color', 'lightgrey');
    $('#City_Name').css('border-color', 'lightgrey');
    $('#State_ID').css('border-color', 'lightgrey');
    $('#City_Description').css('border-color', 'lightgrey');
    $('#City_Short_Code').css('border-color', 'lightgrey');

}
//Valdidation using jquery

function validate() {
    var isValid = true;
    if ($('#City_Name').val().trim() == "") {
        $('#City_Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City_Name').css('border-color', 'lightgrey');
    }
    if ($('#State_ID').val().trim() == "") {
        $('#State_ID').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State_ID').css('border-color', 'lightgrey');
    }
    if ($('#City_Description').val().trim() == "") {
        $('#City_Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City_Description').css('border-color', 'lightgrey');
    }
    if ($('#City_Short_Code').val().trim() == "") {
        $('#City_Short_Code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City_Short_Code').css('border-color', 'lightgrey');
    }
    return isValid;
}