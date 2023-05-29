module.exports = (sequelize, DataTypes) => {
    let alias = "Categorys";
    let cols = {
        idcategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45) // Utiliza DataTypes.STRING en lugar de DataTypes.VARCHAR
        }
    };
    let config = {
        tableName: "category",
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config); // Cambia el nombre de la constante User a Category
    return Category;
}
