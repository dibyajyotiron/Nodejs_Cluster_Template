const router = require("express").Router();
const { getEventData, postEventData } = require("../controllers/eventController");
const { validateReqBody } = require("../middleware/generic");
const { validateEventSchema } = require("../models/validator");

router.get("/eventData", getEventData);
router.post("/eventData", validateReqBody(validateEventSchema), postEventData);

module.exports = router;