async function getData() {
    setInterval(async () => {
        await fetch('http://localhost:3000/lan')
        .then(response => response.json())
        .then((data) => {
            for(const [key, value] of Object.entries(data)) {
                changeStatus(key, value.ip, value.status);
            }
        });
    }, 1000)

}

function changeStatus(hostname, ip, status) {
    if(status) {
        status = 'Running'
    } else {
        status = 'Stopped'
    }
    document.getElementById(hostname).innerHTML = `${hostname} - ${ip}: ${status}.`
}

getData();