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