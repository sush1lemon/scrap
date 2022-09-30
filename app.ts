import express, {Express} from 'express';
import dotenv from 'dotenv';

import ASURA_SCANS from "./src/scripts/ASURA_SCANS";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.get('/', async (req, res) => {
    console.log('first');
    const data =  await ASURA_SCANS()
    console.log('last');
    res.json(data);
});

app.listen(port, () => {
    console.log('Listening')
})