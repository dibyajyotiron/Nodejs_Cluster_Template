const { createWriteStream } = require("fs");
/**
 * Generate random number between a range of min to max (both inclusive)
 * @param {Number} min (0 to 9)
 * @param {Number} max (0 to 9)
 */

function generateUserId(min=0, max=9) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUser(countryList, numberOfUsers) {
    const writeToFile = `${process.cwd()}/users.json`;
    const writable = createWriteStream(writeToFile);
    writable.write("[");
    for (let i = 0; i < numberOfUsers; i++) {
        // since , should be after each element, generate it first, and then add the element, for the first case, don't generate , if it's the first element.
        i !== 0 && writable.write(",");
        const user = {
            id: i,
            date_created: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)), //this creates random date
            location: countryList[Math.floor(Math.random() * countryList.length)]
        }
        writable.write(JSON.stringify(user));
    }
    writable.end("]");
    return;
}

module.exports = {
    generateUser, 
    generateUserId
}