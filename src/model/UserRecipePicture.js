const UserRecipePicture = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe_picture',
        {
            user_id : {
                type: DataTypes.STRING(15)
            },
            food_id : {
                type: DataTypes.INTEGER
            },
        },
        {
            timestamps: false,
            tableName: 'user_recipe_picture',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = UserRecipePicture;