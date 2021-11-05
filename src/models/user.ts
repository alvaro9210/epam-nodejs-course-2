import Joi from 'joi';

// The validation rules for the User object.
const UserSchema = Joi.object()
    .keys({
        id: Joi.number().required(),
        login: Joi.string().required(),
        password: Joi.string().alphanum().required(),
        age: Joi.number().min(4).max(130).required(),
        isDeleted: Joi.boolean().required(),
    });

export default UserSchema;