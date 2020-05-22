const { generateUserId } = require("./users");

/**
 * @typedef {Object} EVENT_OBJ
 * @property {Number} id
 * @property {Date} date_created
 * @property {Number} userId
 * @property {boolean} filterValue
 */

/**
 * @param {Number} [number=1] - how many events are needed, 1 to n...
 * @returns {(EVENT_OBJ|EVENT_OBJ[])} - if number is 1, returns Object, else return Array
 */
function _generateEvent(number = 1) {
  let currDate = Date.now();
  let events = [];
  for (let i = 0; i < number; i++) {
    const obj = {
      id: String(Math.abs(~~((currDate * Math.random()) / 1000))),
      date_created: currDate,
      userId: String(generateUserId()),
      filterValue: Math.random() < 0.5,
    };
    events.push(obj);
  }
  return events.length === 1 ? events[0] : events;
}
module.exports = {
  _generateEvent,
};
