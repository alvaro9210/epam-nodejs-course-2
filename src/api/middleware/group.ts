import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// The validation rules for the Group object.
export const GroupSchema = Joi.object()
    .keys({
        name: Joi.string().required(),
        permissions: Joi.array()
            .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
            .required(),
    });

// Validates a group following the defined GroupSchema from Joi.
export function validateGroup() {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = GroupSchema.validate(req.body, {
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

// Builds the detailed error response to be returned in validateGroup.
function errorResponse(schemaErrors?: Joi.ValidationErrorItem[]) {
    const errors = schemaErrors?.map((error: Joi.ValidationErrorItem) => {
        let { path, message } = error;
        return { path, message };
    });

    return { status: 'failed', errors };
}