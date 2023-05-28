module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
        let cols = {
            idproduct: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type:dataTypes.VARCHAR(50)
            },
            description: {
                type: dataTypes.TEXT(500)
            },
            image: {
                type: dataTypes.VARCHAR(200)
            },
            category: {
                type: dataTypes.VARCHAR(200)
            },
            productType: {
                type: dataTypes.VARCHAR(200)
            },
            price: {
                type: dataTypes.DECIMAL(9)
            }
        };
        let config = {
            tableName: "product",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}