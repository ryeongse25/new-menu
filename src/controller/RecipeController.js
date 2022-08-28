const models = require("../model");

// 레시피 메인 페이지 get
exports.main = async (req, res) => {
    const user = req.session.user;

    let result = await models.UserRecipe.findAll();

    let pictures = [];

    for (let i=0; i<result.length; i++) {
        let result_pic = await models.UserRecipePicture.findOne({where: {food_id: result[i].id}});
        // console.log(result_pic);
        // console.log(result_pic.filename);
        pictures.push(result_pic.filename);
    }

    if ( user != undefined ) {
        res.render("recipe", {isLogin: true, user: user, result: result, picture: pictures});
    } else {
        res.render("recipe", {isLogin: false, result: result, picture: pictures});
    }
}

// 레시피 작성 페이지 get
exports.write_recipe_page = (req, res) => {
    const user = req.session.user;

    res.render("recipe_form", {isLogin: true, user: user});
}

// 레시피 폼 전송 post
exports.post_write = async (req, res) => {
    // console.log("req.files 결과", req.files);
    // console.log("req.body 결과", req.body);

    let count = Object.keys(req.body).length - 6;

    let recipe_obj = {
        user_id: req.body.user_id,
        title: req.body.title,
        comment: req.body.comment,
        category_kind: req.body.category_kind,
        category_food: req.body.category_food,
        material: req.body.material
    };

    let result = await models.UserRecipe.create(recipe_obj);

    let file_lst = [];
    let file_obj = [];

    for (let i=0; i<req.files.length; i++) {
        file_lst.push(req.files[i].filename);
    }

    for (let i=0; i<file_lst.length; i++) {
        file_obj.push({food_id: result.id, filename: file_lst[i]});
    }

    let result_pic = await models.UserRecipePicture.bulkCreate(file_obj);

    let steps = [];
    let step_obj = [];

    for (let i=1; i<count+1; i++) {
        steps.push(req.body[`step_${i}`]);
    }

    for (let i=1; i<count+1; i++) {
        step_obj.push({food_id: result.id, stage: i, description: steps[i-1]});
    }

    let result_step = await models.UserRecipeStep.bulkCreate(step_obj);

    res.send({result: result.id});
}

// 레시피 디테일 페이지 get
exports.detail_page = async (req, res) => {
    const user = req.session.user;

    let result = await models.UserRecipe.findOne({where: {id: req.query.food_id}});
    let result_step = await models.UserRecipeStep.findAll({where: {food_id: req.query.food_id}});
    let result_pic = await models.UserRecipePicture.findAll({where: {food_id: req.query.food_id}});
    let review = await models.Review.findAll({where: {food_id: req.query.food_id}});

    if ( user != undefined ) {
        res.render("recipe_detail", {isLogin: true, user: user, data: result, step: result_step, picture: result_pic, review: review});
    } else {
        res.render("recipe_detail", {isLogin: false, user: undefined, data: result, step: result_step, picture: result_pic, review: review});
    }
}

// 레시피 정보 수정 get
exports.update = async (req, res) => {
    // console.log(req.query);
    const user = req.session.user;

    let result = await models.UserRecipe.findOne({where: {id: req.query.food_id}});
    // console.log("UserRecipe: ", result);
        
    let result_step = await models.UserRecipeStep.findAll({where: {food_id: req.query.food_id}});
    // console.log("UserRecipeStep: ", result_step.length);

    let steps = [];

    for (let i=0; i<result_step.length; i++) {
        steps.push(result_step[i].description);
    }

    let result_pic = await models.UserRecipePicture.findAll({where: {food_id: req.query.food_id}});

    let pictures = [];

    for (let i=0; i<result_pic.length; i++) {
        steps.push(result_pic[i].filename);
    }

    res.render("recipe_form_modify", {isLogin: true, user: user, result: result, step: steps, picture: pictures});
}

exports.like = async (req, res) => {
    const user = req.session.user;
    // console.log(req.body);

    let obj = {
        user_id: user,
        food_id: req.body.food_id
    }

    let result = await models.UserRecipeLike.create(obj);
    res.send(true);
}

exports.dislike = async (req, res) => {
    const user = req.session.user;
    // console.log(req.body);

    let result = await models.UserRecipeLike.destroy({
        where: {user_id: user, food_id: req.body.food_id}
    });
    res.send(true);
}

// 밀키트 페이지
exports.mealkit_page = (req, res) => {
    const user = req.session.user;

    if ( user != undefined ) {
        res.render("mealkit", {isLogin: true, user: user});
    } else {
        res.render("mealkit", {isLogin: false});
    }
}

exports.review = async (req, res) => {
    const user = req.session.user;

    let obj = {
        user_id: user,
        food_id: req.body.food_id,
        comment: req.body.comment
    }

    let result = await models.Review.create(obj);
    res.send({id: result.id});
}

exports.deleteReview = async (req, res) => {
    console.log(req.body);
    let result = await models.Review.destroy({where: {id: req.body.id}});
    res.send(true);
}
