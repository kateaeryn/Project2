const { check, validationResult } = require('express-validator');
const validator = {};

validator.userRules = () => {
    return [
        check("firstName")
            .isLength({min: 2}),
        check("lastName")
            .isLength({min: 2}),
        check("email")
            .isEmail()
            .normalizeEmail(),
        check("password")
            .isLength({min: 6})
]
};

validator.bookRules = () => {
    return [
        check("title")
            .isLength({ min: 3 }),
        check("author")
            .isLength({ min: 6 }),
        check("genre")
            .isLength({ min: 4 }),
        check("pageCount")
            .isNumeric(),
        check("published")
            .isNumeric(),
        check("printType")
            .isLength({ min: 6 }),
        check("readStatus")
            .isLength({ min: 4 })
]
};

validator.checkUserData = (req, res, next) => {
   
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};

validator.checkBookData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};



module.exports = validator;