let address = document.getElementById('connect-address'),
connect = document.getElementById('connect');

NetworkTables.addRobotConnectionListener(onRobotConnection, false);

function onRobotConnection(connected) {
    var state = connected ? 'Robot connected!' : 'Robot disconnected.';
    console.log(state);
    if (connected) {
        // On connect hide the connect popup
        document.getElementById('login').style.display='none';
        document.body.classList.toggle('login', false);
    }
    else {
        // On disconnect show the connect popup
        document.getElementById('login').style.display='';    
        document.body.classList.toggle('login', true);
        // Add Enter key handler
        address.onkeydown = ev => {
            if (ev.key === 'Enter'){
                connect.click();
            } 
        };
        // Enable the input and the button
        address.disabled = connect.disabled = false;
        connect.textContent = 'Connect';
        address.value = '10.50.45.2';
        address.focus();
        // On click try to connect and disable the input and the button
        connect.onclick = () => {
            ipc.send('connect', address.value);
            address.disabled = connect.disabled = true;
            connect.textContent = 'Connecting...';
        };
    }   
}
