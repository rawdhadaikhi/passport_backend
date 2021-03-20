const {check , validationResult} = require('express-validator');
exports.registerRules = () =>[
    check(`firstName`,` this field is required`).notEmpty(),
    check(`lastName`,` this field is required`).notEmpty(),
    check(`email`,` this field should be a valid email`).isEmail(),
    check(`email`,` this field is required`).notEmpty(),
    check(`phoneNumber`,` this field is required`).notEmpty(),
    check(`password`,` this field should be at least 4 char !!`).isLength({min :4,max:15})

];

// validate the data from the client side
exports.loginRules = () =>[
    check('email','this field should be a valid email').isEmail(),
    check(`email`,` this field is required`).notEmpty(),
    check(`password`,` this field is required`).notEmpty(),
    check(`password`,` this field should be at least 4 char !!`).isLength({min :4,max:15})
];

exports.validator =(req,res,next) =>{
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({errors: errors.array()})
   
   }

