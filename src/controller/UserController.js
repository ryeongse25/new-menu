const models = require("../model");

exports.login = (req, res) => {
    res.render("login");
}

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

exports.profile = (req, res) => {
    res.render("profile");
}