exports.main = (req, res) => {
    const user = req.session.user;

    if ( user != undefined ) {
        res.render("recipe", {isLogin: true, user: user});
    } else {
        res.render("recipe", {isLogin: false});
    }
}

exports.write_recipe_page = (req, res) => {
    res.render("recipe_form");
}