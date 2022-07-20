import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';
import prisma from '../../database/prisma/prismaClient';

class TransactionRepositorySQL implements TransactionRepository {
    transaction = prisma.transaction;

    async annotateTransaction(
        transactionData: Transaction
    ): Promise<Transaction> {
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
            return transaction as Transaction;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a transaction. \nError: ${error}`
            );
        }
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

    async deleteTransaction(id: number): Promise<void> {
        try {
            this.transaction.delete({
                where: {
                    id: id,
                },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete transaction. \nError: ${error}`
            );
        }
    }

    async deleteManyTransactions(ids: number[]): Promise<void> {
        try {
            this.transaction.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to delete many transactions. \nError: ${error}`
            );
        }
    }

    async updateTransaction(transaction: Transaction): Promise<void> {
        try {
            this.transaction.update({
                data: transaction,
                where: { id: transaction.id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction. \nError: ${error}`
            );
        }
    }

    async updateTransactionValue(id: number, value: number): Promise<void> {
        try {
            this.transaction.update({
                data: { value },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction value. \nError: ${error}`
            );
        }
    }

    async updateTransactionOrigin(id: number, origin: string): Promise<void> {
        try {
            this.transaction.update({
                data: { origin },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction origin. \nError: ${error}`
            );
        }
    }

    async updateTransactionDestiny(id: number, destiny: string): Promise<void> {
        try {
            this.transaction.update({
                data: { destiny },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction destiny. \nError: ${error}`
            );
        }
    }

    async updateTransactionEmissionDate(id: number, date: Date): Promise<void> {
        try {
            this.transaction.update({
                data: { emission_date: date },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction emission date. \nError: ${error}`
            );
        }
    }

    async updateTransactionDescription(
        id: number,
        description: string
    ): Promise<void> {
        try {
            this.transaction.update({
                data: { description },
                where: { id },
            });
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to update transaction description. \nError: ${error}`
            );
        }
    }
}

export default TransactionRepositorySQL;
