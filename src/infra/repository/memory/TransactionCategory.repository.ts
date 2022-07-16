import TransactionCategory from 'core/entity/TransactionCategory.entity';
import TransactionCategoryRepository from 'core/repository/TransactionCategory.repository';

class TransactionCategoryRepositoryMemory
    implements TransactionCategoryRepository
{
    categories: TransactionCategory[] = [
        {
            id: 1,
            name: 'home expenses',
            planned_value: 4000,
            real_value: 6200,
            difference_value: 6200 - 4000,
            type: 'Renda',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    async createTransactionCategory(
        category: TransactionCategory
    ): Promise<TransactionCategory> {
        const newCategory = this.incrementIdToCategories(category);
        try {
            this.categories = [...this.categories, newCategory];
            return Promise.resolve(newCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    private incrementIdToCategories(
        category: TransactionCategory
    ): TransactionCategory {
        const lastIndexOfCategoryList: number = this.categories.length - 1;
        const newCategory = {
            ...category,
            id: this.categories[lastIndexOfCategoryList].id + 1,
        };
        return newCategory;
    }

    async getTransactionCategoryById(id: number): Promise<TransactionCategory> {
        let category: TransactionCategory | undefined;
        try {
            category = this.categories.find((category) => category.id === id);
            this.hasTransactionCategory(category);
            return Promise.resolve(category as TransactionCategory);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
    }

    private hasTransactionCategory(category: TransactionCategory | undefined) {
        if (category == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactionCategories(): Promise<TransactionCategory[]> {
        try {
            return Promise.resolve(this.categories);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }
}

export default TransactionCategoryRepositoryMemory;
