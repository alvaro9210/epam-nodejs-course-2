import { Router, Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { Container } from 'typedi';
import { IUserDTO } from '../../interfaces/IUser';
import UserService from '../../services/user';

const userRouter: Router = Router();
const NOT_FOUND_ERROR = createHttpError(404, 'User not found');;

export default (app: Router) => {
    const userServiceInstance = Container.get(UserService);


    // Get all users
    userRouter.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const users = await userServiceInstance.getAllUsers();
                return res.json([...users]);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Get a single user
    userRouter.get(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            const { id }: { id?: string } = req.params;
            try {
                const user = await userServiceInstance.getUser(id)
                if (!user) throw NOT_FOUND_ERROR;
                return res.json(user);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Create a user
    userRouter.post(
        '/',
        // validateUser(UserSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            const userDTO: IUserDTO = req.body;
            try {
                const user = await userServiceInstance.createUser(userDTO);
                return res.json(user);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Update a user
    userRouter.put(
        '/:id',
        // validateUser(UserSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            const { id }: { id?: string } = req.params;
            const userDTO: IUserDTO = req.body;
            try {
                const updatedUser = await userServiceInstance.updateUser(id, userDTO);
                if (!updatedUser) throw NOT_FOUND_ERROR;
                return res.json(updatedUser);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );


    app.use('/users/', userRouter);
};