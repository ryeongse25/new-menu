const models = require("../model");

exports.main = (req, res) => {
    const user = req.session.user;

    if ( user != undefined ) {
        res.render("recipe", {isLogin: true, user: user});
    } else {
        res.render("recipe", {isLogin: false});
    }
}

exports.write_recipe_page = (req, res) => {
    const user = req.session.user;

    res.render("recipe_form", {user: user});
}

exports.post_write = (req, res) => {
    console.log(req.body);
    console.log(req.files.length);
    let recipe_obj = {
        user_id: req.body.user_id,
        title: req.body.title,
        comment: req.body.comment,
        video_link: req.body.video_link,
        category_kind: req.body.ct_kind,
        category_food: req.body.ct_food,
        material: req.body.material
    };
    models.UserRecipe.create(recipe_obj)
    .then((result) => {
        console.log(result);
        // models.UserRecipe.bulkCreate({id: result.id, filename:})
        res.render("recipe_detail", {data: result});
    });
}

exports.detail_page = (req, res) => {
    res.render("recipe_detail");
}