const express = require("express")
const route = new express.Router();

const Customer = require("../model/customer")

route.post("/customer", async (req, res) => {
  try {
    const user = new Customer(req.body);
    const customerUser = await user.save();
    res.status(201).send(req.body);
    console.log(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

route.get("/customeraggr", async (req, res) => {
  try {
     const { page = 1, limit = 3 } = req.query

    const customerDetails = await Customer.aggregate([{
      $group:
      {
        _id: "$name",
        amountPaid: { $sum: "$amountPaid" },
        amountPending: { $sum: "$amountPending" },
        totalBill: { $sum: "$currentBill" }
      }
    },

    {
      $project:
      {
        name: "$_id",
        _id: 0,
        amountPaid: 1,
        amountPending: 1,
        totalBill: 1,
        status: {
          $cond: { if: { $gt: ["$amountPending", 0] }, then: "pending", else: "paid" }
        },

      }
    },
    { $sort: { "name": 1 } },
    { $skip: ((page - 1) * limit) },
    { $limit: (limit*1) }






    ])

    res.send({ totalCustomer: customerDetails.length, customerDetails })
  }
  catch (e) {
    res.status(400).send(e)
  }
})
module.exports = route;