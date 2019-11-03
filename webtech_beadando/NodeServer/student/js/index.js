$(document).ready(function () {

    var activeLink = null;

    $("#content").load("home.html");
    $("#carTable").load("cars.html");

    $.each($(".menuButton"),
        function(mbIndex, mbValue){
            if (activeLink == null && $(mbValue).find('a').attr("href") == "home.html") {
                activeLink = mbValue;
                mbValue.classList.add('activeLink')
            }
            $(mbValue).click(function (event) {
                if (mbValue !== activeLink) {
                    mbValue.classList.add('activeLink');
                    activeLink.classList.remove('activeLink');
                    activeLink = mbValue;
                }
                event.preventDefault();
                if (!($(this).find('a').attr('href')=="index.html")) {
                    $("#content").load($(this).find('a').attr("href"));
                }
                else {
                    open("index.html","_self")
                }

            })
    })

});

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

function addNew(name) {
    if(name == "car") {
        $("#content").load('carForm.html');
    } else {
        if(name == "manufacturer") {
            $("#content").load('manufacturerForm.html');
        }
    }
}