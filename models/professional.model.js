const DataTypes = require('sequelize');
const db = require('../config/db');

const Professional = db.define('User', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postalcode: {
        type: DataTypes.NUMBER,
        allowNull: false,
        length: 5
    },
    phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
        length: 10
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName : true,
});

module.exports = Professional;