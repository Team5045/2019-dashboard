var title = document.getElementById("title");
var timer = document.getElementById("timer");
var elevator = document.getElementById("elevator");
var wrist = document.getElementById("wrist");
var intake = document.getElementById("intake");
var table = document.getElementById("mytable");

NetworkTables.addGlobalListener(function(key, value, isNew){
    if (isNew) {
        var row = table.insertRow();
        row.id = key;
        var c0 = row.insertCell(0);
        var c1 = row.insertCell(1);
        c0.textContent = key;
        c1.textContent = value;
        c1.contentEditable = true;
        c1.addEventListener('blur', function(){
            NetworkTables.putValue(c1.parentElement.id,c1.textContent);
        });
    }
    else {
        var row = document.getElementById(key);
        row.cells[1].textContent = value;
        var i = key.split('/').slice(-1).join('/');
    }
});

NetworkTables.addKeyListener("/components/elevator/setpoint", (key, value) => {
    var setter = "";
    if(value<101){
        setter = "GROUND";
    }
    else if(value>101 && value<2901){
        setter = "HATCH 1"
    }
    else if(value>2901 && value<12001){
        setter = "HATCH 2"
    }
    else if(value>12001 && value<20001){
        setter = "HATCH 3"
    }
    elevator.innerHTML = setter;
});

NetworkTables.addKeyListener("/components/wrist/setpoint", (key, value) => {
    var setter = "";
    if(value<101){
        setter = "RETRACTED";
    }
    else if(value>1900){
        setter = "PLACEMENT";
    }
    wrist.innerHTML = setter;
});

NetworkTables.addKeyListener("/LiveWindow/Ungrouped/DoubleSolenoid[0,1]/Value", (key, value) => {
    var setter = "";
    if(value=="Reverse"){
        setter = "CARRYING MODE";
    }
    else {
        setter = "INTAKE MODE";
    }
    intake.innerHTML = setter;
});



NetworkTables.addKeyListener("/robot/time", (key, value) => {
    if (Math.floor(value%60).toString().length==1) {
        var time = '0' + Math.floor(value%60).toString();
    }
    else {
        var time = Math.floor(value%60).toString()
    }
    timer.innerHTML = Math.floor(value/60).toString() + ':' + time;

});
