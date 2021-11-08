import 'reflect-metadata';
import express from 'express';
import loaders from './loaders';

async function startServer(): Promise<void> {
    // Initial setup
    const app = express();

    await loaders({ expressApp: app });
}

startServer();
