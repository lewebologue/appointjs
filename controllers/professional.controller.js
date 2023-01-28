const Professionals = require('../models/professional.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AES = require('../middlewares/encrypt.middleware');
const passwordSchema = require('../middlewares/password.validator');

exports.signup = (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password,
        adress,
        city,
        postalcode,
        phone,
        profession
    } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: 'Some necessary fields not filled' });
    } else if (!passwordSchema.validate(password)) {
        return res.status(400).json({ error: 'Password not allowed' });
    } else {
        const cryptedEmail = AES.encrypt(email);
        Professionals.findOne({ where: { email: cryptedEmail }})
            .then(Professionals => {
                if (Professionals) {
                    return res.status(400).json({ error: 'Email already used' });
                } else {
                    const salt = bcrypt.genSaltSync(10);
                    const hashPassword = bcrypt.hashSync(password, salt);
                    Professionals.create({
                        firstname: firstname,
                        lastname: lastname,
                        email: cryptedEmail,
                        password: hashPassword,
                        adress: adress,
                        city: city,
                        postalcode: postalcode,
                        phone: phone,
                        profession: profession
                    })
                    .then(() => { res.status(201).json({ message: 'Professionals created' });
                    })
                    .catch(error => { res.status(400).json({ error: 'An error as occured', message: error.message });
                    });
                }
            })
            .catch(error => { res.status(500).json({ error: 'An error as occured', message: error.message });
        });
    }
};

exports.login = (req, res, next) =>{
    const cryptedEmail = AES.encrypt(req.body.email);
    Professionals.findOne({ where: { email: cryptedEmail }})
        .then(Professionals => {
            if (!Professionals) {
                return res.status(404).json({ error: 'Professionals not found' });
            }
            if (!bcrypt.compareSync(req.body.password, Professionals.password)) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            res.status(202).json({
                ProfessionalsId: Professionals.id,
                isAdmin: Professionals.isAdmin,
                token: jwt.sign({ ProfessionalsId: Professionals.id },
                'process.env.TOKEN',
                { expiresIn: '24h' })
            });
        })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', message: error.message }));
};

exports.updateProfessionals = (req, res, next) => {
    Professionals.findOne({ where: { id: req.params.id } })
        .then((Professionals) => {
            if (Professionals.id === req.token.ProfessionalsId) {
                const {
                    firstname,
                    lastname,
                    password,
                    adress,
                    city,
                    postalcode,
                    phone
                } = req.body;
                if (!req.body) {
                    return res.status(400).json({ error: 'Some necessary fields not filled' });
                }
                if (!passwordSchema.validate(password)) {
                    return res.status(400).json({ error: 'Password not allowed' });
                }
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                Professionals.update({
                    firstname: firstname || Professionals.firstname,
                    lastname: lastname || Professionals.lastname,
                    password: hashPassword || Professionals.password,
                    adress: adress || Professionals.adress,
                    city: city || Professionals.city,
                    postalcode: postalcode || Professionals.postalcode,
                    phone: phone || Professionals.phone
                }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Professionals updated' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(403).json({ message: '403: Unauthorized request' });
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.deleteProfessionals = (req, res, next) => {
    Professionals.findOne({ where: { id: req.params.id } })
        .then((Professionals) => {
            if (Professionals.id === req.token.ProfessionalsId) {
                Professionals.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Professionals deleted' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else{
                res.status(403).json({message: '403: Unauthorized request'});
            }
        })
    .catch(error => res.status(500).json({ error, message : error.message }));
};

exports.getAllProfessionalss = (req, res, next) => {
    Professionals.findAll({ order: [['createdAt', 'DESC']],})
        .then((Professionals)=>{
            if (Professionals.id === req.token.ProfessionalsId || req.token.isAdmin){
                res.status(200).json(Professionals);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.getOneProfessionals = (req, res, next) => {
    Professionals.findOne({ where: { id: req.params.id}})
        .then((Professionals) => {
            if (Professionals.id === req.token.ProfessionalsId || req.token.isAdmin){
                res.status(200).json(Professionals);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
};