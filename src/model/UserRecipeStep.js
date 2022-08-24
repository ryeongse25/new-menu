const UserRecipeStep = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe_step',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            food_id : {
                type: DataTypes.INTEGER
            },
            stage: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            description: {
                type: DataTypes.TEXT('medium')
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