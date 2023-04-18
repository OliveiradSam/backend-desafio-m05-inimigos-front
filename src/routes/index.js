const express = require("express");
const {registerUser, userLogin, userUpdate} = require("../controllers/user");
const {registerClient} = require("../controllers/client");
const { validateToken } = require("../middlewares");

const router = express();

router.post("/user", registerUser);
router.post("/login", userLogin);

router.use(validateToken);

router.post("/client", registerClient);
router.put("/user", userUpdate);



module.exports = router;
