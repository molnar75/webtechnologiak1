$(document).ready(function () {
    $.getJSON("manufacturers", function(data) {
        for(var i=0; i < data.length; i++) {
            $("#select").append("<option>" + data[i].name + "</option>");
        }
    })
})

$.getJSON("cars", function(data) {
    var table = $('<table id="carsTable" class="normalTable"></table>');
    $(table).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
    $.each(data, function(key, value){
        var row = $('<tr></tr>');
        var nameCell = $('<td>' + value.name + '</td>');
        var consumptionCell = $('<td>' + value.consumption + '</td>');
        var colorCell = $('<td>' + value.color + '</td>');
        var manufacturerCell = $('<td id="authorId" onclick="openManufacturer(' +
            "'" +
            value.manufacturer +
            "'" +
            ')">' + value.manufacturer + '</td>');
        var availableCell = $('<td>' + value.available + '</td>');
        var yearCell = $('<td>' + value.year + '</td>');
        var horsepowerCell = $('<td>' + value.horsepower + '</td>');
        $(row).append(nameCell);
        $(row).append(consumptionCell);
        $(row).append(colorCell);
        $(row).append(manufacturerCell);
        $(row).append(availableCell);
        $(row).append(yearCell);
        $(row).append(horsepowerCell);
        $(table).append(row);
    })
    $("#table").append(table);
})

function addCar() {
    $("#error").empty();
    var name = $("#name").val();
    var consumption = $("#consumption").val();
    var color = $("#color").val();
    var manufacturer = $("#select").val();
    var available = $("#available").val();
    var year = $("#year").val();
    var horsepower = $("#horsepower").val();
    if (name == '' || consumption == '' || color == '' || manufacturer == '' || available == '' || year == '' || horsepower == '') {
        $('#error').append('You must fill every input!');
    } else {
        var car = {
        name: name,
        consumption: consumption,
        color: color,
        manufacturer: manufacturer,
        available: available,
        year: year,
        horsepower: horsepower
        }
        $.post("addCar", car)
            .done(function(msg){  
                    alert("Success")
                    $("#content").load('cars.html');
                })
            .fail(function(xhr, status, error) {
                alert("Fail");
                $("#content").load('carForm.html');
            });
    }
}