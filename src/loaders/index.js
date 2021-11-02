import databaseLoader from './database';

export default async () => {
    // Establish connection to the databse
    console.log('Connecting to the database...');
    const database = await databaseLoader();
    database
        .authenticate()
        .then(() => console.log('Connection has been established successfully.'))
        .catch(err => console.error('Unable to connect to the database: ', err));
};