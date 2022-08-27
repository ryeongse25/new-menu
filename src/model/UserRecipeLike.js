const UserRecipeLike = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe_like',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id : {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            food_id : {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'user_recipe_like',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = UserRecipeLike;