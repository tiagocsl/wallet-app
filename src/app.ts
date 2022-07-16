import express, { Application } from 'express';
import cors from 'cors';

import morganMiddleware from './infra/middlewares/morgan.middleware';
import configureRouter from './controller/router';

import TransactionUsecase from './core/usecase/Transaction.usecase';
import TransactionRepositorySQL from './infra/repository/sql/Transaction.repository';
import TransactionCategoryUsecase from './core/usecase/TransactionCategory.usecase';
import TransactionCategoryRepositorySQL from './infra/repository/sql/TransactionCategory.repository';

class App {
    public express: Application;
    transactionRepository = new TransactionRepositorySQL();
    transactionCategoryRepository = new TransactionCategoryRepositorySQL();
    transaction = new TransactionUsecase(this.transactionRepository);
    transactionCategory = new TransactionCategoryUsecase(
        this.transactionCategoryRepository
    );

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morganMiddleware);
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            return res.send('hello world');
        });
        this.express.use(
            '/api',
            configureRouter(this.transaction, this.transactionCategory)
        );
    }
}

export default new App().express;
