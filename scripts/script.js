
/**
 * Runs a GET request and returns how long it 
 * takes to get a response.
 * @param {URL to fetch} url 
 */
async function getPing(url) {
    let ping;
    let start = Date.now();
    await fetch(url, { mode: 'no-cors' })
        .then(() => ping = (Date.now() - start));
    return ping;
}
// TODO: Create these dynamically.
// I only want to add domains in ONE place and
// the rest to be managed dynamically
let SMAarray = [[], [], []];
let domainArr = [];

/**
 * This function will make the client 
 * go to /siies and check what sites are
 * avaliable for it
 */
async function getSites() {
    let res  =[];
    await fetch('https://status.halim.se/sites/')
    .then(response => response.json())
    .then((data) => {
        res = data;
    });
    return res;
}
/**
 * This function will run 10 times per second indefinitely.
 * What it does is it keeps a SMA of the the ping to each
 * domain and updates the document once every 500ms
 */
async function pingSMA() {
    domainArr = await getSites();
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(async () => {
            let ping = await getPing(domainArr[i]);
            // SMA 10 entires (avg. past 1 sec)
            if (SMAarray[i].length == 10) {
                SMAarray[i].pop();
            }
            SMAarray[i].unshift(ping);

        }, 100);
    }
    // Updates the document
    for (let i = 0; i < domainArr.length; i++) {
        setInterval(() => {
            let avg = Math.round(SMAarray[i].reduce((a, b) => a + b) / SMAarray[i].length);
            changePing(domainArr[i], domainArr[i], avg);
        }, 500);
    }
}

/**
 * Updates the document
 * @param {html ID to change} id 
 * @param {href URL} url 
 * @param {Ping in ms} ping 
 */
function changePing(id, url, ping) {
    let niceUrl = url.replace(/^https?:\/\//,'');
    document.getElementById(id).innerHTML = `<a href="${url}">${niceUrl}</a>: ` + ping + ' ms.';
}

pingSMA();