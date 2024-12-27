import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routers
app.use('/api', router);

const test = async (req: Request, res: Response) => {
    // const a = 10;
    res.send("server run succesfully , Welcome to Blog Project");
};

app.get('/', test);
app.use(globalErrorHandler)



export default app;