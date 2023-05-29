module.exports = (sequelize, DataTypes) => {
    let alias = "Categorys";
        let cols = {
            idcategory: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.VARCHAR(45)
            }
        };
        let config = {
            tableName: "category",
            timestamps: false
        }
    const User =  sequelize.define(alias, cols, config);
    return User
}