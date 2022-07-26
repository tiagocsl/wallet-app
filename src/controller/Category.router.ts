import Category from 'core/entity/Category.entity';
import CategoryUsecase from 'core/usecase/Category.usecase';
import { IRouter, Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

const createCategory =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            await usecase.createCategory(req.body as Category);
            res.status(HttpStatusCodes.CREATED).json();
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getAllCategories =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            const categories = await usecase.getAllCategories();
            res.status(HttpStatusCodes.OK).json(categories);
        } catch (error: unknown) {
            res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
    };

const getCategoryById =
    (usecase: CategoryUsecase) => async (req: Request, res: Response) => {
        try {
            const category = await usecase.getCategoryById(
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

    router.post('', createCategory(usecase));
    router.get('', getAllCategories(usecase));
    router.get('/:id', getCategoryById(usecase));

    return router;
}
