module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
        let cols = {
            idproduct: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type:dataTypes.STRING(50)
            },
            description: {
                type: dataTypes.TEXT(500)
            },
            image: {
                type: dataTypes.STRING(200)
            },
            type: {
                type: dataTypes.STRING(200)
            },
            price: {
                type: dataTypes.DECIMAL(9)
            },
            discount: {
                type: dataTypes.DECIMAL(9)
            },
            categoryId: {
                type: dataTypes.INTEGER
            }
        };
        let config = {
            tableName: "product",
            timestamps: false
        }
        
    const Product =  sequelize.define(alias, cols, config);
    Product.associate = function(models){
        Product.belongsTo(models.Categorys, {
            foreignKey: "categoryId",
            as: "categorys"
        })
    }
    return Product
}