$.getJSON("manufacturers", function(data) {
    var table = $('<table id="manufacturersTable"></table>');
    $(table).append('<tr><th>Name</th><th>Country</th><th>Founded</th><th></th></tr>');
    $.each(data, function(key, value){
        var row = $('<tr></tr>');
        var nameCell = $('<td id="authorId" onclick="openCar(' +
            "'" +
            value.name +
            "'" +
            ')">' + value.name + '</td>');
        var countryCell = $('<td>' + value.country + '</td>');
        var foundedCell = $('<td>' + value.founded + '</td>');
        var buttonCell = $('<td><button onclick="openCar(\'' + value.name + '\')" class="showCarsButton"> Show cars </button></td>');
        $(row).append(nameCell);
        $(row).append(countryCell);
        $(row).append(foundedCell);
        $(row).append(buttonCell);
        $(table).append(row);
    })
    $("#table").append(table);
})

function addManufacturer() {
    $("#error").empty();
    var name = $("#name").val();
    var country = $("#country").val();
    var founded = $("#founded").val();
    if (name == '' || country == '' || founded == '') {
        $('#error').append('You must fill every input!');
    } else {
        var manufacturer = {
            name: name,
            country: country,
            founded: founded
        }
        $.post("addManufacturers", manufacturer)
            .done(function(msg){  
                    alert("Success")
                    $("#content").load('manufacturers.html');
                })
            .fail(function(xhr, status, error) {
                alert("Fail");
                $("#content").load('manufacturerForm.html');
            });
    }
}

function openCar(manufacturer) {
    document.cookie="name=" + manufacturer;
    $.getJSON("manufacturer", function(data){
        if(data.length > 0) {
            var tableShownCars = $('<table></table>');
            $(tableShownCars).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
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
                $(tableShownCars).append(row);
            })
            $("#shownCars").empty();
            $("#shownCars").append('<h2>' + manufacturer + ' car(s): </h2>')
            $("#shownCars").append(tableShownCars);
        } else {
            $("#shownCars").empty();
            $("#shownCars").append('<h2>' + manufacturer + ' car(s): </h2>')
            $("#shownCars").append('<h3>No cars</h3>');
        }
    })
}