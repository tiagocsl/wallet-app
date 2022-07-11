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

    async makeTransaction(transaction: Transaction): Promise<Transaction> {
        const lastIndexOfTransactionList: number = this.transactions.length - 1;
        const newTransaction = {
            ...transaction,
            id: this.transactions[lastIndexOfTransactionList].id + 1,
        };
        this.transactions = [...this.transactions, newTransaction];
        return Promise.resolve(newTransaction);
    }

    async getTransactionById(id: number): Promise<Transaction | undefined> {
        const transactionData = this.transactions.find(
            (transaction) => transaction.id === id
        );
        return Promise.resolve(transactionData);
    }

    async getAllTransactions(): Promise<Transaction[]> {
        const transactionList = this.transactions;
        return Promise.resolve(transactionList);
    }
}

export default TransactionRepositoryMemory;
