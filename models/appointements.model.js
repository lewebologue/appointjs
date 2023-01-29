const DataTypes = require('sequelize');
const db = require('../config/db');

const Appointement = db.define('Appointement', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    freezeTableName : true,
});

module.exports = Appointement;