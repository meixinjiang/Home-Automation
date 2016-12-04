currentRoom = "";

window.onload = function(){
	var page = localStorage.getItem('page');
	if (page == null){
		showPage("Home");
	}
	else{
		showPage(page);
	}
}

function showNoPages() {
    var mainscreenList = document.getElementsByClassName("mainscreen");
    var roomList = document.getElementsByClassName("list-group-item");

    for (var i = 0; i < mainscreenList.length; i++) {
        mainscreenList[i].style.display = "none";
    }

    for (var i = 0; i < roomList.length; i++) {
        if (roomList[i].classList.contains("highlight")){
            roomList[i].classList.remove("highlight");
        }
    }

    document.getElementById("Home").style.display = "none";
    document.getElementById("Lights").style.display = "none";
}

function showPage(id){
    showNoPages();

    if (id != 'Home' || id != 'Security') {
        document.getElementById(id).style.display = "block";
    }
    else {
        document.getElementById(id).style.display = "block";
    }
    localStorage.setItem('page', id);
}

function showMainscreen(element, id){
    var roomList = document.getElementsByClassName("list-group-item");

    if (element.classList.contains("highlight")) {
        element.classList.remove("highlight");
        document.getElementById("lightScreen").style.display = "none";
        currentRoom = "";
    }
    else {
        for (var i = 0; i < roomList.length; i++) {
            if (roomList[i].classList.contains("highlight")){
                roomList[i].classList.remove("highlight");
            }
        }
        element.classList.add("highlight");
        document.getElementById("lightScreen").style.display = "block";
        currentRoom = element.id;
        document.getElementById("roomtitle").innerHTML = " " + element.innerHTML;
    }
}

function changestate(element, pair){
    if (element.classList.contains("active")){
        element.classList.remove("active");
        element.classList.add("disabled");

        document.getElementById(pair).classList.remove("disabled");
        document.getElementById(pair).classList.add("active");

        if (pair == "button1" || pair == "button3"){
            var lightString = localStorage.getItem('lightsOn');
            var light = JSON.parse(lightString);
            if (pair == "button1") {
                var index = light[currentRoom].indexOf(1);
                if (index > -1) {
                    light[currentRoom].splice(index, 1);
                }
                document.getElementById("bright1").value = 0;
                document.getElementById('rangeValLabel1').innerHTML = 0;
            }
            else {
                var index = light[currentRoom].indexOf(2);
                if (index > -1) {
                    light[currentRoom].splice(index, 1);
                }
                document.getElementById("bright2").value = 0;
                document.getElementById('rangeValLabel2').innerHTML = 0;
            }
            localStorage.setItem('lightsOn', JSON.stringify(light));
            document.getElementById('lightstatus').innerHTML = numOpen('lightsOn') + "/26 On";

        }
        else {
            var lightString = localStorage.getItem('lightsOn');
            var light = JSON.parse(lightString);
            if (pair == "button2") {
                light[currentRoom].push(1);
                document.getElementById("bright1").value = 100;
                document.getElementById('rangeValLabel1').innerHTML = 100;
            }
            else {
                light[currentRoom].push(2);
                document.getElementById("bright2").value = 100;
                document.getElementById('rangeValLabel2').innerHTML = 100;
            }

            localStorage.setItem('lightsOn', JSON.stringify(light));
            document.getElementById('lightstatus').innerHTML = numOpen('lightsOn') + "/26 On";
        }
    }
}

function changeslider(element, label) {
    sliderVal = element.value;
    document.getElementById(label).innerHTML = sliderVal;
    if (sliderVal > 0) {
        if (label == "rangeValLabel1") {
            changestate(document.getElementById("button1"), "button2");
        }
        else {
            changestate(document.getElementById("button3"), "button4");
        }
    }
    else {
        if (label == "rangeValLabel1") {
            changestate(document.getElementById("button2"), "button1");
        }
        else {
            changestate(document.getElementById("button4"), "button3");
        }
    }
}

function numOpen(item) {
    var itemString = localStorage.getItem(item);
    var itemDict = JSON.parse(itemString);
    var numOn = 0;

    for (var key in itemDict) {
        numOn += itemDict[key].length;
    }

    return numOn;
}

var userString = localStorage.getItem('user');
var user = JSON.parse(userString);
document.querySelector("h3").innerHTML = user.name + "'s Home";

document.getElementById('lightstatus').innerHTML = numOpen('lightsOn') + "/26 On";
