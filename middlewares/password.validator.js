const passwordValidator = require('password-validator');

const passwordModel = new passwordValidator();
passwordModel
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().symbols(2)
    .has().not().spaces()
    .is().not().oneOf([
        'Passw0rd',
        'Password123',
        'azerty1234',
        '12345678',
        'azertyui',
        'motdepasse',
        'MotDePasse',
        '123456789',
        'Password',
        '12345678',
        '111111',
        '1234567',
        '123123'
    ]);

    module.exports = passwordModel;