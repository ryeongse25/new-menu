const models = require("../model");

// 로그인
exports.login = (req, res) => {
  res.render("login", { isLogin: false });
};

exports.post_login = (req, res) => {
  console.log(req.body);
  models.User.findOne({
    where: { id: req.body.id, pw: req.body.pw },
  }).then((result) => {
    console.log(result);
    if (result == null) {
      res.send(false);
    } else {
      req.session.user = req.body.id;
      res.send(true);
    }
  });
};

// 아이디 찾기
exports.find_id = (req, res) => {
  res.render("find_id", { isLogin: false });
};

exports.post_find_id = (req, res) => {
  models.User.findOne({
    where: { name: req.body.name, email: req.body.email },
  }).then((result) => {
    if (result == null) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};

exports.find_id_result = (req, res) => {
  models.User.findOne({
    where: { name: req.body.name, email: req.body.email },
  }).then((result) => {
    res.render("find_id_result", { isLogin: false, id: result.id });
  });
};

// 비밀번호 찾기
exports.find_pw = (req, res) => {
  res.render("find_pw", { isLogin: false });
};

exports.post_find_pw = (req, res) => {
  models.User.findOne({
    where: { id: req.body.id, email: req.body.email },
  }).then((result) => {
    if (result == null) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};

exports.find_pw_result = (req, res) => {
  models.User.findOne({
    where: { id: req.body.id, email: req.body.email },
  }).then((result) => {
    res.render("find_pw_result", { isLogin: false, pw: result.pw });
  });
};

// 회원가입
exports.register = (req, res) => {
  res.render("register", { isLogin: false });
};

// 아이디 중복확인
exports.id_check = (req, res) => {
  models.User.findOne({
    where: { id: req.body.id },
  }).then((result) => {
    if (result == null) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

exports.post_register = (req, res) => {
  let object = {
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    tel: req.body.tel,
    email: req.body.email,
  };
  models.User.create(object).then((result) => {
    console.log(result);
    res.send(
      "성공적으로 회원가입 되었습니다. 가입하신 정보로 다시 로그인해주세요."
    );
  });
};

// 프로필
exports.profile = async (req, res) => {
  const user = req.session.user;

  if (user != undefined) {
    // 유저 정보
    let result = await models.User.findOne({where: {id: user}});

    // 작성한 레시피 정보
    let recipe_result = await models.UserRecipe.findAll({where: {user_id: user}});

    // 작성한 레시피 사진
    let pictures = [];

    for (let i=0; i<recipe_result.length; i++) {
        let recipe_pic = await models.UserRecipePicture.findOne({where: {food_id: recipe_result[i].id}});
        pictures.push(recipe_pic.filename);
    }

    // 작성한 레시피 제목
    let titles = []

    let review = await models.Review.findAll({where: {user_id: user}});

    for(let i=0; i<review.length; i++) {
      let review_title = await models.UserRecipe.findOne({where: {id: review[i].food_id}});
      titles.push(review_title.title);
    }

    // 좋아요 누른 정보
    let likes = await models.UserRecipeLike.findAll({where: {user_id: user}});
    console.log(likes);

    // 좋아요 제목
    let like_title = []
    // 좋아요 사진
    let like_picture = []

    for(let i=0; i<likes.length; i++) {
      let result_title = await models.UserRecipe.findOne({where: {id: likes[i].food_id}});
      like_title.push(result_title);

      let result_picture = await models.UserRecipePicture.findOne({where: {food_id: likes[i].food_id}});
      like_picture.push(result_picture.filename);
    }

    res.render("profile", {isLogin: true, user: user, name: result.name, tel: result.tel, email: result.email, recipe: recipe_result, picture: pictures, review: review, titles: titles, like_title: like_title, like_picture: like_picture});
  } else {
    res.redirect("/user");
  }
};

// 회원 탈퇴
exports.delete = (req, res) => {
  console.log(req.body);
  models.User.destroy({ where: { id: req.body.id } }).then((result) => {
    req.session.destroy(function (err) {
      res.send("탈퇴되었습니다.");
    });
  });
};

// 정보 수정 페이지
exports.update_page = (req, res) => {
  const user = req.session.user;

  models.User.findOne({ where: { id: user } }).then((result) => {
    res.render("update_page", {
      isLogin: true,
      user: user,
      name: result.name,
      pw: result.pw,
      tel: result.tel,
      email: result.email,
    });
  });
};

exports.update = (req, res) => {
  let obj = {
    pw: req.body.pw,
    name: req.body.name,
    tel: req.body.tel,
    email: req.body.email,
  };
  models.User.update(obj, { where: { id: req.body.id } }).then((result) => {
    res.send(true);
  });
};
