const UserRecipe = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'user_recipe',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT('medium')
            },
            video_link: {
                type: DataTypes.STRING(100)
            },
            category_kind: {
                type: DataTypes.STRING(20)
            },
            category_food: {
                type: DataTypes.STRING(20)
            },
            material: {
                type: DataTypes.TEXT('medium')
            }
        },
        {
            timestamps: false,
            tableName: 'user_recipe',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = UserRecipe;