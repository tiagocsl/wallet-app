import TransactionCategory from 'core/entity/TransactionCategory.entity';
import categoryRepository from 'core/repository/TransactionCategory.repository';

class TransactionCategoryUsecase {
    categoryRepository: categoryRepository;

    constructor(categoryRepository: categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createTransactionCategory(
        transactionCategory: TransactionCategory
    ): Promise<TransactionCategory> {
        try {
            const newCategory: TransactionCategory =
                await this.categoryRepository.createTransactionCategory(
                    transactionCategory
                );
            return newCategory;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getTransactionCategoryById(id: number): Promise<TransactionCategory> {
        try {
            const categoryData: TransactionCategory =
                await this.categoryRepository.getTransactionCategoryById(id);
            return categoryData;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get transaction. \nError: ${error}`
            );
        }
    }

    async getAllTransactionCategories(): Promise<TransactionCategory[]> {
        try {
            const transactionList: TransactionCategory[] =
                await this.categoryRepository.getAllTransactionCategories();
            return transactionList;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions categories. \nError: ${error}`
            );
        }
    }
}

export default TransactionCategoryUsecase;
