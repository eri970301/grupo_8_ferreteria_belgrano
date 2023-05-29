module.exports = (sequelize, dataTypes) => {
    let alias = "Product_Category";
        let cols = {
            idproduct_category: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            product_id: {
                type:dataTypes.STRING(50)
            },
            category_id: {
                type: dataTypes.TEXT(500)
            }
        };
        let config = {
            tableName: "product_category",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}