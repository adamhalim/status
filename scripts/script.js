async function getPing(url) {
    let ping;
    url = 'https://' + url;
    let start = Date.now();
    await fetch(url, { mode: 'no-cors' })
        .then(() => ping = (Date.now() - start));
    return ping;
}
let SMAarray = [[], []];
let domainArr = ['halim.se/', 'wsb.halim.se/'];
async function pingSMA() {
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(async () => {
            let ping = await getPing(domainArr[i]);
            if (SMAarray[i].length == 10) {
                SMAarray[i].pop();
            }
            SMAarray[i].unshift(ping);

        }, 100);
    }
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(() => {
            let avg = Math.round(SMAarray[i].reduce((a, b) => a + b) / SMAarray[i].length);
            changePing(domainArr[i], domainArr[i], avg);
        }, 500);
    }
}

function changePing(id, url, ping) {
    document.getElementById(id).innerHTML = `<a href="https://${url}">${url}</a>: ` + ping + ' ms.';
}

pingSMA();