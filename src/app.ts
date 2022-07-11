import express, { Application } from 'express';
import cors from 'cors';

import morganMiddleware from './infra/middlewares/morgan.middleware';
import configureRouter from './controller/router';

import TransactionUsecase from './core/usecase/Transaction.usecase';
import TransactionRepositorySQL from './infra/repository/sql/Transaction.repository';

class App {
    public express: Application;
    transactionRepository: TransactionRepositorySQL =
        new TransactionRepositorySQL();
    transaction: TransactionUsecase = new TransactionUsecase(
        this.transactionRepository
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
        this.express.use('/api', configureRouter(this.transaction));
    }
}

export default new App().express;
