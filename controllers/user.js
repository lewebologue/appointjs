const User = require('../models/professional.model');
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
        phone
    } = req.body;
    if (!req.body) {
        return res.status(400).json({ error: 'Some necessary fields not filled' });
    }
    if (!passwordSchema.validate(password)) {
        return res.status(400).json({ error: 'Password not allowed' });
    }
    const cryptedEmail = AES.encrypt(email);
    User.findOne({
        where: {
            email: cryptedEmail
        }
    })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Email already used' });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            User.create({
                firstName: firstname,
                lastName: lastname,
                email: cryptedEmail,
                password: hashPassword,
                adress: adress,
                city: city,
                postalcode: postalcode,
                phone: phone
            })
            .then(() => { res.status(201).json({ message: 'User created' });
            })
            .catch(error => { res.status(400).json({ error: 'An error as occured', message: error.message });
            });
        })
        .catch(error => { res.status(500).json({ error: 'An error as occured', message: error.message });
    });
};

exports.login = (req, res, next) =>{
    const cryptedEmail = AES.encrypt(req.body.email);
    User.findOne({ where: { email: cryptedEmail }})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            res.status(202).json({
                userId: user.id,
                isAdmin: user.isAdmin,
                token: jwt.sign({ userId: user.id },
                'process.env.TOKEN',
                { expiresIn: '24h' })
            });
        })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', message: error.message }));
};

exports.updateUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin) {
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
                User.update({
                    firstname: firstname || user.firstname,
                    lastname: lastname || user.lastname,
                    password: hashPassword || user.password,
                    adress: adress || user.adress,
                    city: city || user.city,
                    postalcode: postalcode || user.postalcode,
                    phone: phone || user.phone
                }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'User updated' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(403).json({ message: '403: Unauthorized request' });
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id === req.token.userId) {
                User.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'User deleted' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else{
                res.status(403).json({message: '403: Unauthorized request'});
            }
        })
    .catch(error => res.status(500).json({ error, message : error.message }));
};

exports.getAllUsers = (req, res, next) => {
    User.findAll({ order: [['createdAt', 'DESC']],})
        .then((user)=>{
            if (user.id === req.token.userId || req.token.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id}})
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
};
