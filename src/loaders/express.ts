import express, { Request, Response, NextFunction, Application } from 'express';
import createError, { HttpError } from 'http-errors';
import routes from '../api/routes';

export default ({ app }: { app: Application }) => {

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'It works!',
            status: 'success',
        });
    });

    // Transforms the raw string of req.body into json
    app.use(express.json());

    // Load API routes
    app.use('/', routes());

    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        const err: HttpError = createError(404, 'Not Found');
        err.status = 404;
        next(err);
    });

    // handle all errors
    app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500);
        res.json({
            errors: {
                message: error.message,
            },
        });
    });
};