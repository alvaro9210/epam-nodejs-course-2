import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import UserService from '../../services/user';

const userRouter: Router = Router();

export default (app: Router) => {
    app.use('/users', userRouter);

    // Get all users
    userRouter.get(
        '',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userServiceInstance = Container.get(UserService);
                const users = await userServiceInstance.getAllUsers();
                return res.json([...users]);
            } catch (err) {
                console.error(err);
                return next(err);
            }
        }
    );
};