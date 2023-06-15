module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
        let cols = {
            iduser: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type:dataTypes.STRING(50)
            },
            lastName: {
                type: dataTypes.STRING(50)
            },
            email: {
                type: dataTypes.STRING(200)
            },
            password: {
                type: dataTypes.STRING(200)
            },
            type: {
                type: dataTypes.STRING(200)
            },
            image: {
                type: dataTypes.STRING(200)
            }
        };
        let config = {
            tableName: "user",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}