import TransactionCategory from '../entity/TransactionCategory.entity';
import TransactionCategoryRepositoryMemory from '../../infra/repository/memory/TransactionCategory.repository';
import TransactionCategoryUsecase from './TransactionCategory.usecase';

test('Should create a category', async function () {
    const transactionCategoryRepositoryMemory =
        new TransactionCategoryRepositoryMemory();
    const transactionCategoryUsecase = new TransactionCategoryUsecase(
        transactionCategoryRepositoryMemory
    );

    const categoryData: TransactionCategory = {
        name: 'Cards Expenses',
        planned_value: 12000,
        real_value: 16412,
        difference_value: 16412 - 12000,
        type: 'expense',
        created_at: new Date(),
        updated_at: new Date(),
    } as TransactionCategory;

    const categoryListBeforeNewCategory: TransactionCategory[] =
        await transactionCategoryUsecase.getAllTransactionCategories();

    const newCategory: TransactionCategory =
        await transactionCategoryUsecase.createTransactionCategory(
            categoryData
        );

    const CategoryListAfterNewCategory: TransactionCategory[] =
        await transactionCategoryUsecase.getAllTransactionCategories();

    expect(CategoryListAfterNewCategory.length).toEqual(
        categoryListBeforeNewCategory.length + 1
    );

    const lastIndexOfCategoryList = categoryListBeforeNewCategory.length - 1;
    expect(newCategory.id).toBe(
        categoryListBeforeNewCategory[lastIndexOfCategoryList].id + 1
    );
});

test('Should get an category with specified id', async function () {
    const categoryRepositoryMemory = new TransactionCategoryRepositoryMemory();
    const categoryUsecase = new TransactionCategoryUsecase(
        categoryRepositoryMemory
    );

    const mockedCategory: TransactionCategory = {
        name: 'Salary',
        planned_value: 4212,
        real_value: 3513,
        difference_value: 3513 - 4212,
        type: 'income',
        created_at: new Date(),
        updated_at: new Date(),
    } as TransactionCategory;

    await categoryUsecase.createTransactionCategory(mockedCategory);

    const existentId = 2;
    const existentCategory: TransactionCategory =
        await categoryUsecase.getTransactionCategoryById(existentId);
    expect(existentCategory).toEqual({ ...mockedCategory, id: 2 });
});

test('Should throw an error if pass nonexistent id', async function () {
    const categoryRepositoryMemory = new TransactionCategoryRepositoryMemory();
    const categoryUsecase = new TransactionCategoryUsecase(
        categoryRepositoryMemory
    );

    const nonexistentTransaction = async (
        nonexistentId: number
    ): Promise<TransactionCategory> => {
        return await categoryUsecase.getTransactionCategoryById(nonexistentId);
    };
    await expect(nonexistentTransaction(5)).rejects.toThrowError();
});
