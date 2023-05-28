module.exports = (sequelize, dataTypes) => {
    let alias = "Categorys";
        let cols = {
            idcategory: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type:dataTypes.VARCHAR(45)
            }
        };
        let config = {
            tableName: "product",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}