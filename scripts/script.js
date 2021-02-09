async function getPing() {
    let ping;
    let start = Date.now();
    await fetch("https://halim.se/", { mode: 'no-cors' })
        .then(() => ping = (Date.now() - start));
    return ping;
}
let SMAarray = [];
async function pingSMA() {
    setInterval(async () => {
        let ping = await getPing();
        if (SMAarray.length == 10) {
            SMAarray.pop();
        }
        SMAarray.unshift(ping);
       
    }, 100);

    setInterval(() => {
        let avg = Math.round(SMAarray.reduce((a, b) => a + b) / SMAarray.length);
        // pug stuff here
        changePing(avg);
    }, 1000);
}

function changePing(ping) {
    document.getElementById('yo').innerHTML = ping + 'ms';
}

pingSMA();