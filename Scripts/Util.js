function Load_Combo_LOV(LOV_TYPE, Column_Id, seletedValue) {
    $.ajax({
        url: baseUrl + "/api/lov/" + LOV_TYPE,
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            //debugger;
            var len = response.length;

            $(Column_Id).empty();
            $(Column_Id).append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['LOV_ID'];
                var name = response[i]['LOV_Text'];

                $(Column_Id).append("<option value='" + id + "'>" + name + "</option>");
               
            }
            if (seletedValue == "") {
                $(Column_Id).val(0);
               
            }
            else {
                $(Column_Id).val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function Load_Combo_Country(ComboType,seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Country",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            
            var len = response.length;

            $(ComboType).empty();
            $(ComboType).append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Country_ID'];
                var name = response[i]['Country_Name'];

                $(ComboType).append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue == "") {
                $(ComboType).val(0);
               
            }
            else {
                $(ComboType).val(seletedValue);
            }
          
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}


function Load_Combo_State(ComboType,seletedValue) {
    $.ajax({
        url: baseUrl + "/api/State",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $(ComboType).empty();
            $(ComboType).append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['State_ID'];
                var name = response[i]['State_Name'];

                $(ComboType).append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue == "") {
                $(ComboType).val(0);
               
            }
            else {
                $(ComboType).val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}
function Load_Combo_City(ComboType,seletedValue) {
    $.ajax({
        url: baseUrl + "/api/City",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $(ComboType).empty();
            $(ComboType).append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['City_ID'];
                var name = response[i]['City_Name'];

                $(ComboType).append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue == "") {
                $(ComboType).val(0);
               
            }
            else {
                $(ComboType).val(seletedValue);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function Preferred_Provider(seletedValue) {
    $.ajax({
        url: baseUrl + "/api/Provider/",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var len = response.length;

            $('#Preferred_Provider').empty();
            $('#Preferred_Provider').append($('<option></option>').val(0).html("Choose One"));
            for (var i = 0; i < len; i++) {
                var id = response[i]['Provider_ID'];
                var name = response[i]['Person_Full_Name'];

                $("#Preferred_Provider").append("<option value='" + id + "'>" + name + "</option>");

            }
            if (seletedValue != undefined || seletedValue != null) {

                $('#Preferred_Provider').val(seletedValue);
            }
            else {
                $('#Preferred_Provider').val(0);
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}