const { Schema, model } = require("mongoose");

const billSchema = new Schema({
    billName: String,
 totalAmount: Number,
 date: { type: Date, default: Date.now },
 participants: [
 {
 userName: String,
 amountOwed: Number,
 amountPaid: { type: Number, default: 0 },
 }
 ]
})

module.exports = billModel = model("bills", billSchema);