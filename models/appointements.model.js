const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Appointement = db.define('Appointement', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
},{
    freezeTableName : true,
});

module.exports = Appointement;