import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';

class TransactionRepositoryMemory implements TransactionRepository {
    transactions: Transaction[] = [
        {
            id: 1,
            value: 25000,
            description: 'First transaction!',
            origin: 'From code',
            destiny: 'To array',
            emission_date: new Date(),
        },
    ];

    async annotateTransaction(transaction: Transaction): Promise<Transaction> {
        const newTransaction = this.incrementIdToTransaction(transaction);
        try {
            this.transactions = [...this.transactions, newTransaction];
            return Promise.resolve(newTransaction);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a transaction. \nError: ${error}`
            );
        }
    }

    private incrementIdToTransaction(transaction: Transaction): Transaction {
        const lastIndexOfTransactionList: number = this.transactions.length - 1;
        const newTransaction = {
            ...transaction,
            id: this.transactions[lastIndexOfTransactionList].id + 1,
        };
        return newTransaction;
    }

    async getTransactionById(id: number): Promise<Transaction> {
        let transaction: Transaction | undefined;
        try {
            transaction = this.transactions.find(
                (transaction) => transaction.id === id
            );
            this.hasTransaction(transaction);
            return Promise.resolve(transaction as Transaction);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to find a transaction. \nError: ${error}`
            );
        }
    }

    private hasTransaction(transaction: Transaction | undefined) {
        if (transaction == null)
            throw new Error('The given id does not exist in the database');
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const transactionList = this.transactions;
            return Promise.resolve(transactionList);
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }
}

export default TransactionRepositoryMemory;
