const models = require("../model");

// 로그인
exports.login = (req, res) => {
    res.render("login");
}

exports.post_login = (req, res) => {
    models.User.findOne({
        where: {id: req.body.id, pw: req.body.pw}
    }).then((result) => {
        console.log(result);
        if (result == null) {
            res.send(false);
        } else {
            res.send(true);
        }
    })
}

exports.index = (req, res) => {
    console.log(req.session);
    if (req.session == undefined || req.session.id == "") {
        res.render("index");
    } else {
        models.User.findOne({
            where: {id: req.body.id}
        }).then((result) => {
            console.log(result);
            res.render("index", {data: result});
        })
    }
}

// 회원가입
exports.register = (req, res) => {
    res.render("register");
}

exports.id_check = (req, res) => {
    models.User.findOne({
        where: {id: req.body.id}
    })
    .then((result) => {
        if (result == null) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}

exports.post_register = (req, res) => {
    let object = {
        id: req.body.id,
        pw: req.body.pw,
        name : req.body.name,
        tel: req.body.tel,
        email: req.body.email
    }
    models.User.create(object)
    .then((result) => {
        console.log(result);
        res.send("성공적으로 회원가입 되었습니다. 가입하신 정보로 다시 로그인해주세요.");
    })
}


// 프로필
exports.profile = (req, res) => {
    res.render("profile");
}