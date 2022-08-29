const models = require("../model");

exports.index = async (req, res) => {
    const user = req.session.user;

    let query = 'select food_id, count(food_id) as count from user_recipe_like group by food_id ORDER BY COUNT(food_id) DESC;';

    let result = await models.sequelize.query(query);
    result = result[0];
    console.log(result);
    // console.log(result.length);

    let title = [];
    let user_id = [];

    for(let i=0; i<result.length; i++) {
        let result_title = await models.UserRecipe.findOne({where: {id: result[i].food_id}})
        // console.log(result_title);
        user_id.push(result_title.user_id);
        title.push(result_title.title);
    }

    // console.log(title);
    
    if (user != undefined) {
        res.render("ranking", { isLogin: true, user: user, isLogout: false, like_num: result, title: title, user_id: user_id});
    } else {
        res.render("ranking", { isLogin: false, isLogout: false, like_num: result, title: title, user_id: user_id});
    }
}