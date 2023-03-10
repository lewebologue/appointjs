const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
});

try {
    db.authenticate();
    console.log('Connection established.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;