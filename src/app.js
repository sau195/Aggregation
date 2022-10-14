const express = require("express")

const app = express();

require("./db/conn");

require("./model/customer")

const customerRoute = require("./route/route");


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(customerRoute);

app.listen(port, () => {
  console.log(`connection is running on ${port}`);
});


