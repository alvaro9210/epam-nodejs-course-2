import 'reflect-metadata';
import express from 'express';
import loaders from './loaders';

async function startServer(): Promise<void> {
    // Initial setup
    const app = express();
    app.listen(3000);

    await loaders({ expressApp: app });
}

startServer();
