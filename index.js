const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`DB Connection Successfull!`))
    .catch((err) => console.log(err));

app.get("/api/test", (req, res) => {
    console.log(`object`);
    return res.status(200).json("fdsfgds");
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
