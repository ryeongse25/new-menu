const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // 

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret key",
  })
);

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const { Script } = require("vm");

// 메인 페이지
app.get("/", function (req, res) {
  const user = req.session.user;

  if (user != undefined) {
    res.render("index", { isLogin: true, user: user, isLogout: false });
  } else {
    res.render("index", { isLogin: false, isLogout: false });
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  const user = req.session.user;
  req.session.destroy(function (err) {
    res.render("index", {isLogout: true, isLogin: false});
  });
});

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.listen(port, () => {
  console.log("Server Port : ", port);
});
