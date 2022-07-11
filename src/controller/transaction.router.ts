import Transaction from 'core/entity/Transaction.entity';
import TransactionUsecase from 'core/usecase/Transaction.usecase';
import { IRouter, Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

const annotateTransaction =
    (usecase: TransactionUsecase) => async (req: Request, res: Response) => {
        try {
            await usecase.annotateTransaction(req.body as Transaction);
            res.status(HttpStatusCodes.CREATED).json();
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getAllTransactions =
    (usecase: TransactionUsecase) => async (req: Request, res: Response) => {
        try {
            const transactions = await usecase.getAllTransactions();
            res.status(HttpStatusCodes.OK).json(transactions);
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getTransactionById =
    (usecase: TransactionUsecase) => async (req: Request, res: Response) => {
        try {
            const transaction = await usecase.getTransactionById(
                Number(req.params.id)
            );
            res.status(HttpStatusCodes.OK).json(transaction);
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

export default function configureTransactionRouter(
    usecase: TransactionUsecase
): IRouter {
    const router: IRouter = Router();

    router.post('', annotateTransaction(usecase));
    router.get('', getAllTransactions(usecase));
    router.get('/:id', getTransactionById(usecase));

    return router;
}
