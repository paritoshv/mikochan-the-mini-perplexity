import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/index.js';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;

initRoutes(app);

app.get('/test', (req, res) => { 
    return res.status(200).json("OK") });
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT}`);
});
