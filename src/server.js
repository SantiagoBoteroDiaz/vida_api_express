import express from 'express';
import { env } from './config/env.js';

const app = express();
app.use(express.json());

app.listen(env.APP_PORT, () => {
    console.log(`Corriendo en el puerto ${env.APP_PORT}`)
})