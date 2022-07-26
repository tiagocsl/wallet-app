import Category from 'core/entity/Category.entity';
import categoryRepository from 'core/repository/Category.repository';

class CategoryUsecase {
    categoryRepository: categoryRepository;

    constructor(categoryRepository: categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(category: Category): Promise<Category> {
        try {
            const newCategory: Category =
                await this.categoryRepository.createCategory(category);
            return newCategory;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getCategoryById(id: number): Promise<Category> {
        try {
            const categoryData: Category =
                await this.categoryRepository.getCategoryById(id);
            return categoryData;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get transaction. \nError: ${error}`
            );
        }
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            const transactionList: Category[] =
                await this.categoryRepository.getAllCategories();
            return transactionList;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions categories. \nError: ${error}`
            );
        }
    }
}

export default CategoryUsecase;
