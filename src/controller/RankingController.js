const models = require("../model");

// 랭킹 페이지 get
exports.index = async (req, res) => {
    const user = req.session.user;

    let query = 'select food_id, count(food_id) as count from user_recipe_like group by food_id ORDER BY COUNT(food_id) DESC;';

    let result = await models.sequelize.query(query);
    result = result[0];

    let title = [];
    let user_id = [];
    let pictures = [];

    for(let i=0; i<result.length; i++) {
        let result_title = await models.UserRecipe.findOne({where: {id: result[i].food_id}});
        let result_picture = await models.UserRecipePicture.findOne({where: {food_id: result[i].food_id}});
        user_id.push(result_title.user_id);
        title.push(result_title.title);
        pictures.push(result_picture.filename);
    }
    
    if (user != undefined) {
        res.render("ranking", { isLogin: true, user: user, isLogout: false, like_num: result, title: title, user_id: user_id, picture: pictures});
    } else {
        res.render("ranking", { isLogin: false, isLogout: false, like_num: result, title: title, user_id: user_id, picture: pictures});
    }
}