const router = require("express").Router();
const { getUser, postUser, postUsers } = require("../controllers/userController");
const { validateReqBody } = require("../middleware/generic");
const { validateUserSchema } = require("../models/validator");

router.get("/", getUser);
router.post("/", validateReqBody(validateUserSchema), postUser);
router.post("/bulk", postUsers);

module.exports = router;