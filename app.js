
const usersRouter = require('./routes/radar');
const express = require("express");
const app = express();


app.use(express.json());
app.use(usersRouter);


app.listen(5000, () => {
    console.log("server is listiening port 5000");
});
