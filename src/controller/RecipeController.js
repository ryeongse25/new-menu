const models = require("../model");

// 레시피 메인 페이지 get
exports.main = async (req, res) => {
    const user = req.session.user;

    // 전체
    let result = await models.UserRecipe.findAll();
    let pictures = [];

    for (let i=0; i<result.length; i++) {
        let result_pic = await models.UserRecipePicture.findOne({where: {food_id: result[i].id}});
        pictures.push(result_pic.filename);
    }

    // 밥
    let rice = await models.UserRecipe.findAll({where: {category_kind: "rice"}});
    let rice_pictures = []

    for (let i=0; i<rice.length; i++) {
        let rice_pic  = await models.UserRecipePicture.findOne({where: {food_id: rice[i].id}});
        rice_pictures.push(rice_pic.filename);
    }

    // 국/찌개

    let soup = await models.UserRecipe.findAll({where: {category_kind: "soup"}});
    let soup_pictures = []

    for (let i=0; i<soup.length; i++) {
        let soup_pic  = await models.UserRecipePicture.findOne({where: {food_id: soup[i].id}});
        soup_pictures.push(soup_pic.filename);
    }
    
    // 면
    let noodle = await models.UserRecipe.findAll({where: {category_kind: "noodle"}});
    let noodle_pictures = []

    for (let i=0; i<noodle.length; i++) {
        let noodle_pic  = await models.UserRecipePicture.findOne({where: {food_id: noodle[i].id}});
        noodle_pictures.push(noodle_pic.filename);
    }

    // 고기
    let meat = await models.UserRecipe.findAll({where: {category_kind: "meat"}});
    let meat_pictures = []

    for (let i=0; i<meat.length; i++) {
        let meat_pic  = await models.UserRecipePicture.findOne({where: {food_id: meat[i].id}});
        meat_pictures.push(meat_pic.filename);
    }

    // 해산물
    let seafood = await models.UserRecipe.findAll({where: {category_kind: "seafood"}});
    let seafood_pictures = []

    for (let i=0; i<seafood.length; i++) {
        let seafood_pic  = await models.UserRecipePicture.findOne({where: {food_id: seafood[i].id}});
        seafood_pictures.push(seafood_pic.filename);
    }

    // 채소
    let vegetables = await models.UserRecipe.findAll({where: {category_kind: "vegetables"}});
    let vegetables_pictures = []

    for (let i=0; i<vegetables.length; i++) {
        let vegetables_pic  = await models.UserRecipePicture.findOne({where: {food_id: vegetables[i].id}});
        vegetables_pictures.push(vegetables_pic.filename);
    }

    // 소스
    let sauce = await models.UserRecipe.findAll({where: {category_kind: "sauce"}});
    let sauce_pictures = []

    for (let i=0; i<sauce.length; i++) {
        let sauce_pic  = await models.UserRecipePicture.findOne({where: {food_id: sauce[i].id}});
        sauce_pictures.push(sauce_pic.filename);
    }

    // 디저트
    let dessert = await models.UserRecipe.findAll({where: {category_kind: "dessert"}});
    let dessert_pictures = []

    for (let i=0; i<dessert.length; i++) {
        let dessert_pic  = await models.UserRecipePicture.findOne({where: {food_id: dessert[i].id}});
        dessert_pictures.push(dessert_pic.filename);
    }

    let data = {isLogin: false, result: result, picture: pictures, rice: rice, rice_pictures: rice_pictures, soup: soup, soup_pictures: soup_pictures, noodle: noodle, noodle_pictures: noodle_pictures, meat: meat, meat_pictures: meat_pictures, seafood: seafood, seafood_pictures: seafood_pictures, vegetables: vegetables, vegetables_pictures: vegetables_pictures, sauce: sauce, sauce_pictures, sauce_pictures, dessert: dessert, dessert_pictures: dessert_pictures}

    let data_login = {isLogin: true, user: user, result: result, picture: pictures, rice: rice, rice_pictures: rice_pictures, soup: soup, soup_pictures: soup_pictures, noodle: noodle, noodle_pictures: noodle_pictures, meat: meat, meat_pictures: meat_pictures, seafood: seafood, seafood_pictures: seafood_pictures, vegetables: vegetables, vegetables_pictures: vegetables_pictures, sauce: sauce, sauce_pictures, sauce_pictures, dessert: dessert, dessert_pictures: dessert_pictures}

    if ( user != undefined ) {
        res.render("recipe", data_login);
    } else {
        res.render("recipe", data);
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
        let like = await models.UserRecipeLike.findAll({where: {user_id: user, food_id: req.query.food_id}});

        console.log("like_length", like.length);

        if (like.length == 0){
            res.render("recipe_detail", {isLogin: true, user: user, data: result, step: result_step, picture: result_pic, review: review, isLike: false});
        } else {
            res.render("recipe_detail", {isLogin: true, user: user, data: result, step: result_step, picture: result_pic, review: review, isLike: true});
        }
    } else {
        res.render("recipe_detail", {isLogin: false, user: undefined, data: result, step: result_step, picture: result_pic, review: review, isLike: false});
    }
}

// 레시피 정보 수정 get
exports.update = async (req, res) => {
    console.log("req.query", req.query);
    const user = req.session.user;

    let result = await models.UserRecipe.findOne({where: {id: req.query.food_id}});
    console.log("UserRecipe: ", result);
        
    let result_step = await models.UserRecipeStep.findAll({where: {food_id: req.query.food_id}});
    console.log("UserRecipeStep: ", result_step.length);

    let steps = [];

    for (let i=0; i<result_step.length; i++) {
        steps.push(result_step[i].description);
    }

    let result_pic = await models.UserRecipePicture.findAll({where: {food_id: req.query.food_id}});

    let pictures = [];

    for (let i=0; i<result_pic.length; i++) {
        pictures.push(result_pic[i].filename);
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

exports.mealkit_detail = (req, res) => {
    const user = req.session.user;

    if ( user != undefined ) {
        res.render("mealkit_detail", {isLogin: true, user: user});
    } else {
        res.render("mealkit_detail", {isLogin: false});
    }
}

// 후기 기능
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

exports.getReview = async (req, res) => {
    let result = await models.Review.findOne({where: {id: req.query.id}});
    
    res.send({review: result.comment});
}

exports.updateReview = async (req, res) => {
    const user = req.session.user;

    let new_obj = {
        user_id: user,
        food_id: req.body.food_id,
        comment: req.body.comment
    }
    let result = await models.Review.update(new_obj, {where: {id: req.body.id}});
    
    res.send(true);
}