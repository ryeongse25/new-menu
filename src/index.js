const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./model");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('1234'));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret key",
  })
);

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const rankingRouter = require("./routes/ranking");

// const { Script } = require("vm");

// 메인 페이지
app.get("/", async function (req, res) {
  const user = req.session.user;

  let query = 'select food_id, count(food_id) as count from user_recipe_like group by food_id ORDER BY COUNT(food_id) DESC;';

  let result = await models.sequelize.query(query);
  result = result[0];
  console.log(result);

  let title = [];
  let pictures = [];

  for(let i=0; i<result.length; i++) {
      let result_title = await models.UserRecipe.findOne({where: {id: result[i].food_id}});
      let result_picture = await models.UserRecipePicture.findOne({where: {food_id: result[i].food_id}});
      title.push(result_title.title);
      pictures.push(result_picture.filename);
  }

  if (user != undefined) {
    res.render("index", { isLogin: true, user: user, isLogout: false, like_num: result, title: title, picture: pictures });
  } else {
    res.render("index", { isLogin: false, isLogout: false, like_num: result, title: title, picture: pictures });
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  const user = req.session.user;
  req.session.destroy(function (err) {
    res.render("index", {isLogout: true, isLogin: false});
  });
});

app.get("/team", (req, res) => {
  const user = req.session.user;

  if (user != undefined) {
    res.render("team", { isLogin: true, user: user, isLogout: false });
  } else {
    res.render("team", { isLogin: false, isLogout: false });
  }
});

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/ranking", rankingRouter);

app.listen(port, () => {
  console.log("Server Port : ", port);
});
