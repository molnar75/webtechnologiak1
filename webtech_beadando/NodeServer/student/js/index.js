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

function addNew(name) {
    if(name == "car") {
        $("#content").load('carForm.html');
    } else {
        if(name == "manufacturer") {
            $("#content").load('manufacturerForm.html');
        }
    }
}