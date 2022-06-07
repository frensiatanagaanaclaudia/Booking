const express = require("express");
const homeController = require("../controller/homeController");


const router = express.Router();

router.get("/",homeController.homePage);
//localhost:port/api/client/otem/:id
router.get("/item/:id",homeController.detailPage);

module.exports = router;
