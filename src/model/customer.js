const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: String,
    amountPaid: Number,
    amountPending: Number,
    currentBill: Number,
    status: String
})

const Customer = new mongoose.model("Customer", customerSchema);

module.exports = Customer;