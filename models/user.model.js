const DataTypes = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalcode: {
        type: DataTypes.STRING,
        allowNull: true,
        length: 5
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 10
    },
    upcomingEvents: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    pastEvents: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
},{
    freezeTableName : true,
});

module.exports = User;