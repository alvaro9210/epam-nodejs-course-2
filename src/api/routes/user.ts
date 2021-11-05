import express, { Router, Request, Response, NextFunction } from 'express';

const userRouter: Router = Router();

export default (app: Router) => {
    app.use('/users', userRouter);

    // Get all users
    userRouter.get(
        '',
        (req: Request, res: Response) => {
            // const { loginSubstring, limit }: IRequests.IGetUsersRequest = req.query;
            // const suggestedUsers = getAutoSuggestUsers(loginSubstring, limit);

            // return res.json(suggestedUsers.filter(ACTIVE_USERS_FILTER));
            return res.json(['fake user 1', 'fake user 2']);
        }
    );
};