import TransactionUsecase from 'core/usecase/Transaction.usecase';
import { IRouter, Router } from 'express';

import configureTransactionRouter from './transaction.router';

const configureRouter = (transactionUsecase: TransactionUsecase): IRouter => {
    const router: IRouter = Router();

    router.use('/transactions', configureTransactionRouter(transactionUsecase));

    return router;
};

export default configureRouter;
