const express = require("express");
const { createBill, getAll, findOne, updateBill, deleteBill, everyoneDept, paidComplete, findHighestPaid } = require("../CONTROLLER/controller");
const router = express.Router()

router.post("/",createBill);
router.get("/getAll",getAll);
router.get("/getOne/:id",findOne);
router.patch("/update/:billId/:parId",updateBill);
router.delete("/delete/:billId",deleteBill);
router.get("/checkDept/:billsId",everyoneDept);
router.get("/paidInFull/:billsId",paidComplete);
router.get("/paidTheMost/:billsId",findHighestPaid);
router.get("/totalBill/:billsId",totalAmountPaid);

module.exports = router