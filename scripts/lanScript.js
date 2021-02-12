    async function getData() {
    setInterval(async () => {
        await fetch('https://status.halim.se/services')
        .then(response => response.json())
        .then((data) => {
            for(const [key, value] of Object.entries(data)) {
                changeStatus(key, value.ip, value.status);
            }
        });
    }, 1000)

}

function changeStatus(hostname, ip, status) {
    let style;
    if(status) {
        status = 'Running'
        style = 'running'
    } else {
        status = 'Stopped'
        style = 'stopped'
    }
    console.log()
    // Adds whitespace so that the colon is 
    // on the same width for all IPs. 
    // This assumes the longest IP is 13 (bad code...)
    let whiteSpace = " ".repeat(13 - ip.length);
    document.getElementById(hostname).innerHTML = `> ${ip}${whiteSpace}: <span class="${style}">${status}</span>`
}

getData();