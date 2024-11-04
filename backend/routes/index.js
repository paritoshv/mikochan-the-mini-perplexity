import searchRoutes from './search.routes.js';
const initRoutes = (app) => {
    app.use('/api/v1/search', searchRoutes);
};

export { initRoutes };