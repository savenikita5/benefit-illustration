const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/policy.controller");

router.post("/calculate", auth, controller.calculate);
module.exports = router;
