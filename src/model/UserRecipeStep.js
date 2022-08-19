const UserRecipeStep = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe_step',
        {
            food_id : {
                type: DataTypes.INTEGER
            },
            stage: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            description: {
                type: DataTypes.TEXT('medium')
            },
            filename: {
                type: DataTypes.STRING(20)
            }
        },
        {
            timestamps: false,
            tableName: 'user_recipe_step',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = UserRecipeStep;