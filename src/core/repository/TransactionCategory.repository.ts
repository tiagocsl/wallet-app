import TransactionCategory from 'core/entity/TransactionCategory.entity';

interface TransactionCategoryRepository {
    createTransactionCategory(
        category: TransactionCategory
    ): Promise<TransactionCategory>;
    getTransactionCategoryById(id: number): Promise<TransactionCategory>;
    getAllTransactionCategories(): Promise<TransactionCategory[]>;
}

export default TransactionCategoryRepository;
