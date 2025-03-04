const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./src/api-error");
const cosodulieu = require("./src/config/cosodulieu")

const route = require('./src/routes/index')
require("dotenv").config(); // dung dotenv

cosodulieu.connect()
app.use(cors());

app.use(express.json());

route(app);

app.use((req, res, next) => {
    return next(new ApiError(400, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

const PORT = process.env.PORT
//su dung dotenv: data luu trong file .env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
