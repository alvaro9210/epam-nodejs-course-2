import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// The validation rules for the User object.
export const UserSchema = Joi.object()
    .keys({
        login: Joi.string().required(),
        password: Joi.string().alphanum().required(),
        age: Joi.number().min(4).max(130).required(),
    });

// Validates a user following the defined userSchema from Joi.
export function validateUser() {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = UserSchema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
}

// Builds the detailed error response to be returned in validateUser.
function errorResponse(schemaErrors?: Joi.ValidationErrorItem[]) {
    const errors = schemaErrors?.map((error: Joi.ValidationErrorItem) => {
        let { path, message } = error;
        return { path, message };
    });

    return { status: 'failed', errors };
}