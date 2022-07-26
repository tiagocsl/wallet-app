import Category from '../entity/Category.entity';
import CategoryRepositoryMemory from '../../infra/repository/memory/Category.repository';
import CategoryUsecase from './Category.usecase';

test('Should create a category', async function () {
    const categoryRepositoryMemory =
        new CategoryRepositoryMemory();
    const categoryUsecase = new CategoryUsecase(
        categoryRepositoryMemory
    );

    const categoryData: Category = {
        name: 'Cards Expenses',
        planned_value: 12000,
        real_value: 16412,
        difference_value: 4412,
        type: 'Despesa',
        created_at: new Date(),
        updated_at: new Date(),
    } as Category;

    const categoryListBeforeNewCategory: Category[] =
        await categoryUsecase.getAllCategories();

    const newCategory: Category =
        await categoryUsecase.createCategory(
            categoryData
        );

    const CategoryListAfterNewCategory: Category[] =
        await categoryUsecase.getAllCategories();

    expect(CategoryListAfterNewCategory.length).toEqual(
        categoryListBeforeNewCategory.length + 1
    );

    const lastIndexOfCategoryList = categoryListBeforeNewCategory.length - 1;
    expect(newCategory.id).toBe(
        categoryListBeforeNewCategory[lastIndexOfCategoryList].id + 1
    );
});

test('Should get an category with specified id', async function () {
    const categoryRepositoryMemory = new CategoryRepositoryMemory();
    const categoryUsecase = new CategoryUsecase(
        categoryRepositoryMemory
    );

    const mockedCategory: Category = {
        name: 'Salary',
        planned_value: 4212,
        real_value: 3513,
        difference_value: 3513 - 4212,
        type: 'Renda',
        created_at: new Date(),
        updated_at: new Date(),
    } as Category;

    await categoryUsecase.createCategory(mockedCategory);

    const existentId = 2;
    const existentCategory: Category =
        await categoryUsecase.getCategoryById(existentId);
    expect(existentCategory).toEqual({ ...mockedCategory, id: 2 });
});

test('Should throw an error if pass nonexistent id', async function () {
    const categoryRepositoryMemory = new CategoryRepositoryMemory();
    const categoryUsecase = new CategoryUsecase(
        categoryRepositoryMemory
    );

    const nonexistentTransaction = async (
        nonexistentId: number
    ): Promise<Category> => {
        return await categoryUsecase.getCategoryById(nonexistentId);
    };
    await expect(nonexistentTransaction(5)).rejects.toThrowError();
});
