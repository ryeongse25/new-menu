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

    res.render("recipe_form", {isLogin: true, user: user});
}

exports.post_write = (req, res) => {
    console.log(req.body);
    console.log(req.files);
    console.log(req.files[0].filename);
    let recipe_obj = {
        user_id: req.body.user_id,
        title: req.body.title,
        comment: req.body.comment,
        video_link: req.body.link,
        category_kind: req.body.ct_kind,
        category_food: req.body.ct_food,
        material: req.body.material
    };
    models.UserRecipe.create(recipe_obj)
    .then((result) => {
        console.log(result);
        let file_lst = [];
        let file_obj = [];
        for (let i=0; i<req.files.length; i++) {
            file_lst.push(req.files[i].filename);
        }
        console.log(file_lst);
        for (let i=0; i<req.files.length; i++) {
            file_obj.push({food_id: result.id, filename: req.files[i].filename});
        }
        console.log(file_obj);
        models.UserRecipePicture.bulkCreate(file_obj)
        .then((result_pic) => {
            console.log(result_pic);
            res.render("recipe_detail", {isLogin: true, user: req.body.user_id, data: result});
        })
    });
}

exports.detail_page = (req, res) => {
    res.render("recipe_detail");
}