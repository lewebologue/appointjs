const DataTypes = require('sequelize');
const db = require('../config/db');

const Professionnal = db.define('Professionnal', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
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
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postalcode: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 5
    },
    phone: {
        type: DataTypes.STRING,
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

module.exports = Professionnal;