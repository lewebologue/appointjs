const Users = require('../models/user.model');
const Professionals = require('../models/professional.model');
const Appointements = require('../models/appointements.model');

//Synchronisation de la base de données
const Init = async () => {
    Appointements.hasMany(Users, Professionals);
    Users.belongsToMany(Appointements, {onDelete:'CASCADE'});
    Professionals.belongsToMany(Appointements, {onDelete:'CASCADE'});
    await Users.sync({/*alter: true*/});
    await Professionals.sync({/*alter: true*/});
    await Appointements.sync({/*alter: true*/});
}

module.exports = Init;