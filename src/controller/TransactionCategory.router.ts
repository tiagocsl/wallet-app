import Category from 'core/entity/TransactionCategory.entity';
import CategoryUsecase from 'core/usecase/TransactionCategory.usecase';
import { IRouter, Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

const createTransactionCategory =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            await usecase.createTransactionCategory(req.body as Category);
            res.status(HttpStatusCodes.CREATED).json();
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getAllTransactionCategories =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            const categories = await usecase.getAllTransactionCategories();
            res.status(HttpStatusCodes.OK).json(categories);
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getTransactionCategoryById =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            const category = await usecase.getTransactionCategoryById(
                Number(req.params.id)
            );
            res.status(HttpStatusCodes.OK).json(category);
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

export default function configureTransactionRouter(
    usecase: CategoryUsecase
): IRouter {
    const router: IRouter = Router();

    router.post('', createTransactionCategory(usecase));
    router.get('', getAllTransactionCategories(usecase));
    router.get('/:id', getTransactionCategoryById(usecase));

    return router;
}
