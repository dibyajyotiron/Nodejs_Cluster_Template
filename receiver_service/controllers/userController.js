const { User } = require("../models/user");
module.exports = {
  async getUser(req, res) {
    let user = await User.findOne({ uid: req.body.id });
    return res.json({
      user,
    });
  },
  async postUser(req, res) {
    const { id, date_created, location } = req.body;
    const user = new User({
      uid: id,
      createdAt: date_created,
      location,
    });
    return res.json({
      success: true,
      user,
    });
  },
  async postUsers(req, res) {
    let bulkOpArr = [];
    const users = req.body;
    for (const user of users) {
      let exp = {
        updateOne: {
          filter: { uid: user.id },
          update: {
            $set: {
              uid: user.id,
              createdAt: user.date_created,
              location: user.location,
            },
          },
          upsert: true,
        },
      };
      bulkOpArr.push(exp);
    }
    let result = await User.bulkWrite(bulkOpArr);
    return res.json(result);
  },
};
