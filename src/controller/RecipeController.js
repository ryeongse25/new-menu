const models = require("../model");

// 레시피 페이지 get
exports.main = async (req, res) => {
    const user = req.session.user;

    let result = await models.UserRecipe.findAll();
    console.log(result);
    
    let pictures = [];

    for (let i=0; i<result.length; i++) {
        let result_pic = await models.UserRecipePicture.findOne({where: {food_id: result[i].id}});
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
exports.post_write = (req, res) => {

    let count = Object.keys(req.body).length - 6;

    let recipe_obj = {
        user_id: req.body.user_id,
        title: req.body.title,
        comment: req.body.comment,
        category_kind: req.body.ct_kind,
        category_food: req.body.ct_food,
        material: req.body.material
    };

    models.UserRecipe.create(recipe_obj)
    .then((result) => {

        let file_lst = [];
        let file_obj = [];

        for (let i=0; i<req.files.length; i++) {
            file_lst.push(req.files[i].filename);
        }
        
        for (let i=0; i<req.files.length; i++) {
            file_obj.push({food_id: result.id, filename: req.files[i].filename});
        }
        
        models.UserRecipePicture.bulkCreate(file_obj)
        .then((result_pic) => {

            let steps = [];
            let step_obj = [];

            for (let i=1; i<count+1; i++) {
                steps.push(req.body[`step_${i}`]);
            }

            for (let i=1; i<count+1; i++) {
                step_obj.push({food_id: result.id, stage: i, description: steps[i-1]});
            }

            models.UserRecipeStep.bulkCreate(step_obj)
            .then((result_step) => {
                res.render("recipe_detail", {isLogin: true, user: req.body.user_id, data: result, picture: result_pic, step: result_step});
            })
        })
    });
}

// 레시피 정보 수정 get
exports.update = (req, res) => {
    const user = req.session.user;

    models.UserRecipe.findOne({where: {id: req.query.food_id}})
    .then((result) => {
        console.log("UserRecipe: ", result);
        
        models.UserRecipeStep.findAll({where: {food_id: result.id}})
        .then((result_step) => {
            console.log("UserRecipeStep: ", result_step.length);

            let steps = [];

            for (let i=0; i<result_step.length; i++) {
                steps.push(result_step[i].description);
            }

            console.log("steps", steps);

            models.UserRecipePicture.findAll({where: {food_id: result.id}})
            .then((result_pic) => {
                console.log("RecipePicture: ", result_pic.length);

                let pictures = [];

                for (let i=0; i<result_pic.length; i++) {
                    steps.push(result_pic[i].filename);
                }

                console.log(pictures);

                res.render("recipe_form_modify", {isLogin: true, user: user, result: result, step: steps, picture: pictures});
            })
        })
    })
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

