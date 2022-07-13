import TransactionCategory from 'core/entity/TransactionCategory.entity';
import TransactionCategoryRepository from 'core/repository/TransactionCategory.repository';

class TransactionCategoryRepositoryMemory
    implements TransactionCategoryRepository
{
    transactionCategories: TransactionCategory[] = [
        {
            id: 1,
            name: 'home expenses',
            planned_value: 4000,
            real_value: 6200,
            difference_value: 6200 - 4000,
            type: 'income',
            transactions: [],
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    async createTransactionCategory(
        category: TransactionCategory
    ): Promise<TransactionCategory> {
        const newTransactionCategory = this.incrementIdToCategories(category);
        try {
            this.transactionCategories = [
                ...this.transactionCategories,
                newTransactionCategory,
            ];
            return Promise.resolve(newTransactionCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    private incrementIdToCategories(
        transactionCategory: TransactionCategory
    ): TransactionCategory {
        const lastIndexOfTransactionCategoryList: number =
            this.transactionCategories.length - 1;
        const newTransactionCategory = {
            ...transactionCategory,
            id:
                this.transactionCategories[lastIndexOfTransactionCategoryList]
                    .id + 1,
        };
        return newTransactionCategory;
    }

    async getTransactionCategoryById(id: number): Promise<TransactionCategory> {
        let transactionCategory: TransactionCategory | undefined;
        try {
            transactionCategory = this.transactionCategories.find(
                (transactionCategory) => transactionCategory.id === id
            );
            this.hasTransactionCategory(transactionCategory);
            return Promise.resolve(transactionCategory as TransactionCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
    }

    private hasTransactionCategory(
        transactionCategory: TransactionCategory | undefined
    ) {
        if (transactionCategory == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactionCategories(): Promise<TransactionCategory[]> {
        try {
            const transactionCategoryList = this.transactionCategories;
            return Promise.resolve(transactionCategoryList);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }
}

export default TransactionCategoryRepositoryMemory;
