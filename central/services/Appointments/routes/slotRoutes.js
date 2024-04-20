const express = require("express");
const router = express.Router();
const SlotController = require("../controllers/slotController");

router.post("/", SlotController.createSlot);

router.get("/", SlotController.getAllSlots);

router.get("/lab/:labId", SlotController.getSlotsByLabID);

router.put("/:slotId", SlotController.updateSlot);

router.delete("/:slotId", SlotController.deleteSlot);

module.exports = router;
