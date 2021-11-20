import { Router } from 'express';
import userRoutes from './user';
import groupRoutes from './group';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    userRoutes(app);
    groupRoutes(app);

    return app;
}