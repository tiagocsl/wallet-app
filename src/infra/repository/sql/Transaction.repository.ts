import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';
import prisma from 'infra/database/prisma/prismaClient';

class TransactionRepositorySQL implements TransactionRepository {
    transaction = prisma.transaction;

    async makeTransaction(transactionData: Transaction): Promise<Transaction> {
        try {
            return await this.transaction.create({ data: transactionData });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a transaction. \nError: ${error}`
            );
        }
    }

    async getTransactionById(id: number): Promise<Transaction> {
        let transaction: Transaction | null;
        try {
            transaction = await this.transaction.findFirst({
                where: {
                    id: id,
                },
            });
            this.hasTransaction(transaction);
            return transaction as Transaction;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a transaction. \nError: ${error}`
            );
        }
    }

    private hasTransaction(transaction: Transaction | null) {
        if (transaction == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            return this.transaction.findMany({});
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }
}

export default TransactionRepositorySQL;
