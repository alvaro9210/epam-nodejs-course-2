import { Router, Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { Container } from 'typedi';
import { IGroupDTO } from '../../interfaces/IGroup';
import GroupService from '../../services/group';
import * as middleware from '../middleware/group';

const groupRouter: Router = Router();
const GROUP_NOT_FOUND_ERROR = createHttpError(404, 'Group not found');

export default (app: Router) => {
    const groupServiceInstance = Container.get(GroupService);


    // Get all groups
    groupRouter.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const groups = await groupServiceInstance.getAll();
                return res.json([...groups]);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Get a single group
    groupRouter.get(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            const { id }: { id?: string } = req.params;
            try {
                const group = await groupServiceInstance.get(id)
                if (!group) throw GROUP_NOT_FOUND_ERROR;
                return res.json(group);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Create a group
    groupRouter.post(
        '/',
        middleware.validateGroup(),
        async (req: Request, res: Response, next: NextFunction) => {
            const groupDTO: IGroupDTO = req.body;
            try {
                const group = await groupServiceInstance.create(groupDTO);
                return res.json(group);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Update a group
    groupRouter.put(
        '/:id',
        middleware.validateGroup(),
        async (req: Request, res: Response, next: NextFunction) => {
            const { id }: { id?: string } = req.params;
            const groupDTO: IGroupDTO = req.body;
            try {
                const updatedGroup = await groupServiceInstance.update(id, groupDTO);
                if (!updatedGroup) throw GROUP_NOT_FOUND_ERROR;
                return res.json(updatedGroup);
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    // Delete a group (Hard-delete)
    groupRouter.delete(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            const { id }: { id?: string } = req.params;
            try {
                await groupServiceInstance.delete(id);
                return res.status(204).json({});
            } catch (error) {
                console.error(error);
                return next(error);
            }
        }
    );

    app.use('/groups/', groupRouter);
};