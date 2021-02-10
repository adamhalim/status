const util = require('util');
var exec = util.promisify(require('child_process').exec);

const lanSites = require('../data/services.json');

/**
 * Ping a server on the local network
 * @param {IP address of server} ip 
 */
async function getPing(ip) {
    const { stdout, stderr } = await exec(`ping -c 1 ${ip}`);
}

let lanStatus = lanSites;
/**
 * Goes through each service on ../data/lanSites.json,
 * pings them and checks if they're running.
 * This run once per second.
 */
async function aliveStatuses() {
    setInterval(async () => {
        for (const [hostname, values] of Object.entries(lanStatus)) {
            await getPing(values.ip).then(() => {
                lanStatus[hostname].status = true;
            }).catch(() => {
                lanStatus[hostname].status = false;
            });
        }
    }, 1000);
}

module.exports = {
    aliveStatuses,
    lanStatus,
}