import TransactionCategory from 'core/entity/TransactionCategory.entity';
import TransactionCategoryRepository from 'core/repository/TransactionCategory.repository';
import prisma from '../../database/prisma/prismaClient';

class TransactionCategoryRepositorySQL
    implements TransactionCategoryRepository
{
    category = prisma.transactionCategory;

    async createTransactionCategory(
        category: TransactionCategory
    ): Promise<TransactionCategory> {
        try {
            return await this.category.create({ data: category });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a category. \nError: ${error}`
            );
        }
    }

    async getTransactionCategoryById(id: number): Promise<TransactionCategory> {
        let category: TransactionCategory | null;
        try {
            category = await this.category.findFirst({
                where: {
                    id: id,
                },
            });
            this.hasTransaction(category);
            return category as TransactionCategory;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a category. \nError: ${error}`
            );
        }
    }

    private hasTransaction(category: TransactionCategory | null) {
        if (category == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactionCategories(): Promise<TransactionCategory[]> {
        try {
            return this.category.findMany({});
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all categories. \nError: ${error}`
            );
        }
    }
}

export default TransactionCategoryRepositorySQL;
