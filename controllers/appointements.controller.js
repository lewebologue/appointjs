const Appointement = require('../models/appointements.model');
const Professional = require('../models/professional.model');
const User = require('../models/user.model');

exports.create = (req, res,next ) => {
    const AppointementData = {
        date: req.body.date,
        time: req.body.time
    };

    Appointement.create(AppointementData)
        .then(appointement => { res.json({ status: appointement.date + ' ' + appointement.time + ' Registered!' })
        })
        .catch(err => { res.send('error: ' + err)
        })
};

exports.delete = (req, res, next) => {
    Appointement.findOne({
        where: { id: req.params.id }
    })
        .then(appointement => {
            if(appointement.userId === req.token.userId ) {
                appointement.destroy();
                res.json({ status: appointement.date + ' ' + appointement.time + ' Deleted!' })
            }
            else {
                res.json({ status: 'You are not authorized to delete this appointement!' })
            }
        })
        .catch(err => { res.send('error: ' + err)
        })
};

exports.update = (req, res, next) => {
    Appointement.findOne({
        where: { id: req.params.id }
    })
        .then(appointement => {
            if(appointement.userId === req.token.userId ) {
                appointement.update({
                    date: req.body.date,
                    time: req.body.time
                });
                res.json({ status: appointement.date + ' ' + appointement.time + ' Updated!' })
            }
            else {
                res.json({ status: 'You are not authorized to update this appointement!' })
            }
        })
        .catch(err => { res.send('error: ' + err)
        })
}

exports.getOne = (req, res, next) => {
    Appointement.findOne({
        where : { id: req.params.id },
        include: [
            { model: Professional },
            { model: User }
        ]
    })
    .then(appointement => {
        if(!appointement) {
            res.send('Appointement does not exist')
        }
        res.json(appointement)
    })
    .catch(err => { res.send('error: ' + err)
    })
};

exports.getAllByProfessional = (req, res, next) => {
    Appointement.findAll({
        where : { professionalId: req.params.id },
        include: [
            { model: Professional },
            { model: User }
        ]
    })
    .then(appointements => {
        if(!appointements) {
            res.send('No appointements for this professional')
        }
        res.json(appointements)
    })
    .catch(err => { res.send('error: ' + err)
    })
};

exports.getAllByUser = (req, res, next) => {
    Appointement.findAll({
        where : { userId: req.params.id },
        include: [
            { model: Professional },
            { model: User }
        ]
    })
    .then(appointements => {
        if(!appointements) {
            res.send('No appointements for this user')
        }
        res.json(appointements)
    })
    .catch(err => { res.send('error: ' + err)
    })
};