const Users = require('../models/user.model');
const Professionals = require('../models/professional.model');
const Appointements = require('../models/appointements.model');

const Init = async () => {
    Appointements.belongsTo(Users);
    Appointements.belongsTo(Professionals);
    Users.hasMany(Appointements, { onDelete: 'cascade' });
    Professionals.hasMany(Appointements);
    await Users.sync({/*alter: true */});
    await Professionals.sync({/*alter: true */});
    await Appointements.sync({/*alter: true */});
}

module.exports = Init;