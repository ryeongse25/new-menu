const Review = (Sequelize, DataTypes) => {

    const model = Sequelize.define(
        'review',
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
            },
            comment : {
                type: DataTypes.TEXT('medium')
            }
        },
        {
            timestamps: false,
            tableName: 'review',
            freezeTableName: true
        }
    );
    return model;
}

module.exports = Review;