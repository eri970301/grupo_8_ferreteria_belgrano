module.exports = (sequelize, dataTypes) => {
    let alias = "User_Products";
        let cols = {
            iduser_product: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            product_id: {
                type:dataTypes.VARCHAR(50)
            },
            user_id: {
                type: dataTypes.TEXT(500)
            }
        };
        let config = {
            tableName: "user_product",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}