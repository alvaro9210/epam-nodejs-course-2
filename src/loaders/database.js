import { Sequelize } from 'sequelize';

export default async () => new Sequelize({
        database: 'alvarocontreras',
        username: 'alvarocontreras',
        password: null,
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
    });