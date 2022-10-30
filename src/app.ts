import { AppDataSource } from './config/dataSource.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import morgan from 'morgan';
import path from 'path';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use('/api/v1', indexRouter);

export default app;
