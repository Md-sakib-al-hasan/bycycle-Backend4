import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cron from 'node-cron';
import { UserServices } from './app/modules/User/user.service';
import AppError from './app/errors/AppError';
import status from 'http-status';
import { SalesDeatilsServerice } from './app/modules/saleDetails/saleDetails.service';
import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [`${config.domain_fontend}`], credentials: true }));
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('SuccessFully run server');
});

//autoupdate useStatus
cron.schedule('0 0 * * *', async () => {
  try {
    await UserServices.checkAndUpdateUserStatus(); // This should now work
    await SalesDeatilsServerice.StoreSalesData(); // This should now work
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new AppError(status.CONFLICT, 'Error in cron job');
  }
});

//Not Found
app.use(notFound);

//golbal Error Handeling
app.use(globalErrorHandler);

export default app;
