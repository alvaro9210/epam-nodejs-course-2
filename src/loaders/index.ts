import { Sequelize } from 'sequelize/types';
import express from 'express';

import databaseLoader from './database';
import expressLoader from './express';
import dependencyInjector from './dependencyInjector';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    // Establish connection to the databse
    console.log('Connecting to the database...');
    const database: Sequelize = await databaseLoader();
    database
        .authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(err => console.error('Unable to connect to the database: ', err));

    // Inject dependencies
    dependencyInjector({ sequelize: database });

    // Load express
    await expressLoader({ app: expressApp });
};