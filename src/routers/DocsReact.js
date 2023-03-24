const express = require("express");
const router = express.Router();
const Docscontrollers = require("../app/controllers/Docs");

router.get("/:Docs", Docscontrollers.Docs);
module.exports = router;
