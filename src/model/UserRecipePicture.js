const UserRecipePicture = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe_picture',
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
            filename : {
                type: DataTypes.STRING(200)
            }
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