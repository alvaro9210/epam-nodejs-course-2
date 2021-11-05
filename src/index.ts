import express, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import UserSchema from './middleware/user';
import * as IRequests from './interfaces/IRequests';
import IUser from './interfaces/IUser';

const app = express();
const PORT = process.env.PORT || 4200;
const userRouter = express.Router();
const NOT_FOUND_ERROR = { status: 'failed', message: 'Not found' };
const ACTIVE_USERS_FILTER = (user: IUser) => !user.isDeleted;

// List of in-memory users.
const users = [
    {
        id: 1,
        login: 'user1',
        password: 'user1password',
        age: 21,
        isDeleted: false,
    },
    {
        id: 2,
        login: 'user2',
        password: 'user2password',
        age: 22,
        isDeleted: false,
    },
    {
        id: 3,
        login: 'user3',
        password: 'user3password',
        age: 23,
        isDeleted: false,
    },
    {
        id: 4,
        login: 'user4',
        password: 'user4password',
        age: 24,
        isDeleted: false,
    },
    {
        id: 5,
        login: 'user5',
        password: 'user5password',
        age: 25,
        isDeleted: false,
    }
];

// Initial setup
app.listen(3000);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'I am using babel in NodeJS',
        status: 'success',
    });
});

// User router setup
// Main route
userRouter.get('/', (req, res) => {
    res.status(200).json({
        message: 'I am using babel in NodeJS',
        status: 'success',
    });
});

// Get all users
userRouter.get(
    '/users',
    (req, res) => {
        const { loginSubstring, limit }: IRequests.IGetUsersRequest = req.query;
        const suggestedUsers = getAutoSuggestUsers(loginSubstring, limit);

        return res.json(suggestedUsers.filter(ACTIVE_USERS_FILTER));
    }
);

// Get a single user
userRouter.get(
    '/user/:id',
    (req, res) => {
        const { id } = req.params;

        return res.json(users.filter((user) => user.id == Number(id)));
    }
);

// Create a user
userRouter.post(
    '/users',
    validateUser(UserSchema),
    (req, res) => {
        const user = req.body;
        users.push(user);

        return res.json(users.filter(ACTIVE_USERS_FILTER));
    }
);

// Create a user
userRouter.put(
    '/users/:id',
    validateUser(UserSchema),
    (req, res) => {
        const { id } = req.params;
        const userIndex = users.findIndex(user => user.id == Number(id));
        if (userIndex != -1) {
            // If user exists
            const updatedUser = req.body;
            updatedUser.id = id; // Avoid changing the id
            users[userIndex] = updatedUser;

            return res.json(users.filter(ACTIVE_USERS_FILTER));
        } else {
            // If user does not exist 
            return res.status(404).json(NOT_FOUND_ERROR);
        }
    }
);

// Soft delete a user
userRouter.delete(
    '/user/:id',
    (req, res) => {
        const { id } = req.params;
        const userIndex = users.findIndex(user => user.id == Number(id) && !user.isDeleted);
        if (userIndex != -1) {
            // If user exists
            users[userIndex].isDeleted = true;

            return res.json(users.filter(ACTIVE_USERS_FILTER));
        } else {
            // If user does not exist 
            return res.status(404).json(NOT_FOUND_ERROR);
        }
    }
);

// Returns a list of user matching a specific substring in the 
// login property.
//
// If no [loginSubstring] is passed, then the substring to look 
// for will be ''.
// If no [limit] is passed, then the limit is the whole array.
function getAutoSuggestUsers(loginSubstring = '', limit = users.length) {
    const filteredUsers = users.filter(
        user => user.login.indexOf(loginSubstring) > -1
    );

    return filteredUsers.slice(0, limit);
}

// Validates a user following the defined userSchema from Joi.
function validateUser(schema: typeof UserSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
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
    const errors = schemaErrors?.map((error) => {
        let { path, message } = error;
        return { path, message };
    });

    return { status: 'failed', errors };
}

app.use('/', userRouter);
app.listen(PORT, () => console.log('server up and running'));
