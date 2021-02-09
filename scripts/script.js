async function getPing(url) {
    let ping;
    let start = Date.now();
    await fetch(url, { mode: 'no-cors' })
        .then(() => ping = (Date.now() - start));
    return ping;
}
let SMAarray = [[], []];
let domainArr = [['https://halim.se/', 'halim'], ['https://wsb.halim.se/', 'wsb']];
async function pingSMA() {
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(async () => {
            let ping = await getPing(domainArr[i][0]);
            if (SMAarray[i].length == 10) {
                SMAarray[i].pop();
            }
            SMAarray[i].unshift(ping);

        }, 100);
    }
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(() => {
            let avg = Math.round(SMAarray[i].reduce((a, b) => a + b) / SMAarray[i].length);
            changePing(domainArr[i][1], domainArr[i][0], avg);
        }, 500);
    }
}

function changePing(id, url, ping) {
    let niceUrl = url.replace(/^https?:\/\//,'');
    document.getElementById(id).innerHTML = `<a href="${url}">${niceUrl}</a>: ` + ping + ' ms.';
}

pingSMA();