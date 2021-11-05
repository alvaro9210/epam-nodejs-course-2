import { Sequelize } from 'sequelize';

export default async (): Promise<Sequelize> => new Sequelize({
    database: 'alvarocontreras',
    username: 'alvarocontreras',
    password: undefined,
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});