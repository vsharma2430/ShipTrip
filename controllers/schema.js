const Joi = require('joi');

const userSchema = Joi.object({
    // Username: required, 3-30 characters, alphanumeric with optional underscore/hyphen
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9_-]+$')),

    // Email: required, valid email format
    email: Joi.string()
        .email({ 
            minDomainSegments: 2, 
            tlds: { allow: ['com', 'net', 'org', 'edu'] } 
        })
        .required(),

    // Password: required, 8-50 characters, must contain uppercase, lowercase, number, and special char
    password: Joi.string()
        .min(8)
        .max(50)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),

    // First name: required, 2-50 characters, letters only
    first_name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .pattern(new RegExp('^[a-zA-Z]+$')),

    // Last name: required, 2-50 characters, letters only
    last_name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .pattern(new RegExp('^[a-zA-Z]+$')),

    bio: Joi.string()
        .min(2)
        .max(255)
        .pattern(new RegExp("^[a-zA-Z ,.'!]+$")),

    date_of_birth: Joi.date()
        .max('now') // Ensures DOB is not in the future
        .min('1900-01-01') // Sets a reasonable minimum date (e.g., no one over 125 years old)
        .required() // Makes DOB mandatory
        .iso() // Ensures the date is in ISO 8601 format (e.g., "YYYY-MM-DD")
        .messages({
            'date.base': '"dob" must be a valid date',
            'date.max': '"dob" cannot be in the future',
            'date.min': '"dob" must be after 1900-01-01',
            'date.iso': '"dob" must be in YYYY-MM-DD format',
            'any.required': '"dob" is required'
        }),

});

module.exports = {userSchema}