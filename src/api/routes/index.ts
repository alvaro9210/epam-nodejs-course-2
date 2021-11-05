import { Router } from 'express';
import userRoutes from './user';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    userRoutes(app);

    return app
}