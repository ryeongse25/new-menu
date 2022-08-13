const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use( bodyParser.json() );
app.use(express.static('public'));

const userRouter = require("./routes/user");

// 메인 페이지
app.get("/", function(req, res) {
    res.render("index");
});

app.use('/user', userRouter);

app.listen(port, ()=>{
    console.log( "Server Port : ", port );
});