const { check, validationResult } = require('express-validator');
const validator = {};

validator.userRules = () => {
    return [
        check("firstName", 'First name is required')
            .isLength({min: 2}),
        check("lastName", 'Last name is required')
            .isLength({min: 2}),
        check("email", 'Email is required')
            .isEmail()
            .normalizeEmail(),
        check("password", 'Password is required')
            .isLength({min: 6})
]
};

validator.bookRules = () => {
    return [
        check("title", 'Title is required')
            .isLength({ min: 3 }),
        check("author", 'Author is required')
            .isLength({ min: 6 }),
        check("genre", 'Genre is required')
            .isLength({ min: 4 }),
        check("pageCount", 'Number of pages is required')
            .isNumeric(),
        check("published", "Publication year is required")
            .isNumeric(),
        check("printType", "Type of print is required")
            .isLength({ min: 6 }),
        check("readStatus")
            .isLength({ min: 4 }, 'Status is required')
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