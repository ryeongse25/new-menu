const models = require("../model");

exports.login = (req, res) => {
    res.render("login");
}

exports.register = (req, res) => {
    res.render("register");
}

exports.idCheck = (req, res) => {

}

exports.profile = (req, res) => {
    res.render("profile");
}