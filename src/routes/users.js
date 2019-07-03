const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/users/submit", userController.create);
router.post("/users/signIn", userController.signin);
router.get("/users/user", userController.show);
router.get("/users/signOut", userController.signOut);


module.exports = router;