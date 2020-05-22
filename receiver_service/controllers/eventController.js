const { User } = require("../models/user");
const { Event } = require("../models/event");

function parseEventQuery(query, userIdArr) {
  let { filterValue } = query;
  const { date_created_start, date_created_end } = query;
  let filterValueFilter = filterValue
    ? [{ filterValue: JSON.parse(filterValue) }]
    : [{}];

  let dateFilterStart = date_created_start
    ? [{ createdAt: { $gte: new Date(date_created_start) } }]
    : [{}];
  let dateFilterEnd = date_created_end
    ? [{ createdAt: { $lte: new Date(date_created_end) } }]
    : [{}];

  let userIdFilter = userIdArr.length
    ? [{ userId: { $in: userIdArr.map((u) => u._id) } }]
    : [{}];
  return [
    {
      $match: {
        $and: [
          ...userIdFilter,
          ...filterValueFilter,
          ...dateFilterStart,
          ...dateFilterEnd,
        ],
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
  ];
}

module.exports = {
  async getEventData(req, res) {
    const { location } = req.query;
    let users;

    if (location) users = await User.find({ location }, { _id: 1 });
    else users = [];

    const events = await Event.aggregate(
      parseEventQuery(req.query, users)
    ).allowDiskUse(true);

    if (!events.length)
      return res.json({
        total_number_of_events: 0,
        average_events_per_second: 0,
      });
    const avg =
      (events.length /
        (events[events.length - 1].createdAt.getTime() -
          events[0].createdAt.getTime())) *
      1000;

    return res.json({
      total_number_of_events: events.length,
      average_events_per_second: avg,
    });
  },
  async postEventData(req, res) {
    const { id, date_created, userId, filterValue } = req.body;
    const user = await User.findOne({ uid: userId });
    const event = new Event({
      uid: id,
      createdAt: date_created,
      userId: user._id,
      filterValue: filterValue,
    });
    await event.save();
    return res.status(200).json({ success: true });
  },
};
