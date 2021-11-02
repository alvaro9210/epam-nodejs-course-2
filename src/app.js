import loaders from  './loaders';

async function startServer() {
    await loaders();
}

startServer();