const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.UserRecipe = require("./UserRecipe")(sequelize, Sequelize);
db.UserRecipeStep = require("./UserRecipeStep")(sequelize, Sequelize);
db.UserRecipePicture = require("./UserRecipePicture")(sequelize, Sequelize);
db.UserRecipeLike = require("./UserRecipeLike")(sequelize, Sequelize);

// user(id) -> user_recipe(user_id)
db.User.hasMany(db.UserRecipe, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.UserRecipe.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});

// user_recipe(id) -> user_recipe_step(food_id)
db.UserRecipe.hasMany(db.UserRecipeStep, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.UserRecipeStep.belongsTo(db.UserRecipe, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});

// user_recipe(id) -> user_recipe_picture(food_id)
db.UserRecipe.hasMany(db.UserRecipePicture, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.UserRecipePicture.belongsTo(db.UserRecipe, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});

// user(id) -> user_recipe_like(user_id)
db.User.hasMany(db.UserRecipeLike, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.UserRecipeLike.belongsTo(db.User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "cascade",
});

// user_recipe(id) -> user_recipe_like(food_id)
db.UserRecipe.hasMany(db.UserRecipeLike, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.UserRecipeLike.belongsTo(db.UserRecipe, {
    foreignKey: "food_id",
    sourceKey: "id",
    onDelete: "cascade",
});

module.exports = db;