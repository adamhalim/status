const users = require('../data/users.json');

/**  
 * Utilities for the application.
 * I'd like to replace this in the future with 
 * classes/interfaces instead.
 * Feel free to implement these however you'd like.
*/

/**
 * Implement a (better) way to authenticate
 * users. I'm using a .json file with
 * email addresses for authentication 
 * (lazy, but works for me.)
 * @param {Object} profile 
 */
function validateUser(profile) {
    let validUser = users[profile.email];
    if(validUser) {
        return true;
    }
    return false;
}

/**
 * Returns all valid sites for a user.
 * (I'm using email as user)
 * This should return an array of urls.
 * @param {String} user 
 */
function getValidSites(user) {
    return users[user.email].validSites;
}

/**
 * Returns all valid services for a user.
 * (I'm using email as user)
 * This should return an array of service names
 * @param {String} user 
 */
function getValidServices(user) {
    return users[user.email].validServices;
}

module.exports = function() {
    this.validateUser = validateUser;
    this.getValidSites = getValidSites;
    this.getValidServices = getValidServices;
}