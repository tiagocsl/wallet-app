import TransactionUsecase from 'core/usecase/Transaction.usecase';
import CateogyUsecase from 'core/usecase/Category.usecase';
import { IRouter, Router } from 'express';

import configureTransactionRouter from './Transaction.router';
import configureCategoryRouter from './Category.router';

const configureRouter = (
    transactionUsecase: TransactionUsecase,
    categoryUsecase: CateogyUsecase
): IRouter => {
    const router: IRouter = Router();

    router.use('/transactions', configureTransactionRouter(transactionUsecase));
    router.use('/categories', configureCategoryRouter(categoryUsecase));

    return router;
};

export default configureRouter;
