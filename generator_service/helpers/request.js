const axios = require("axios");
const cron = require("node-cron");
const { _generateEvent } = require("./event");

/**
 *
 * @param {Number} rps
 * @returns {Array<Promise>}
 */
function RPSGroup(rps) {
  let promises = [];
  for (let i = 0; i < rps; i++) {
    promises.push(
      axios({
        method: "POST",
        url: "http://localhost:8080/api/r/eventData",
        data: _generateEvent()
      })
    );
  }
  return promises;
}

async function mockRequest(rps, n) {
  cron.schedule("* * * * * *",async () => {
    try {
      let res = await Promise.all([...RPSGroup(rps)]);
      // console.log(++n, "Success");
      res = res.map(r => r.data);
      console.log(res);
    } catch (error) {
      // console.log(++n, "Failure");
      console.log(error.response ? error.response.data : error);
    }
  });
  // setTimeout(mockRequest, 1000);
}
function asyncTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  mockRequest,
};
