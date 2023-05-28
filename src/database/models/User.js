module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
        let cols = {
            iduser: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type:dataTypes.VARCHAR(50)
            },
            lastName: {
                type: dataTypes.VARCHAR(50)
            },
            email: {
                type: dataTypes.VARCHAR(200)
            },
            password: {
                type: dataTypes.VARCHAR(200)
            },
            userType: {
                type: dataTypes.VARCHAR(200)
            },
            image: {
                type: dataTypes.VARCHAR(200)
            }
        };
        let config = {
            tableName: "user",
            timestamps: false
        }
        
    const User =  sequelize.define(alias, cols, config);
    return User
}