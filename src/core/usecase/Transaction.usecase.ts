import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';

class TransactionUsecase {
    transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    async makeTransaction(transaction: Transaction): Promise<Transaction> {
        try {
            const newTransaction: Transaction =
                await this.transactionRepository.makeTransaction(transaction);
            return newTransaction;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to create a transaction. \nError: ${error}`
            );
        }
    }

    async getTransactionById(id: number): Promise<Transaction> {
        try {
            const transactionData: Transaction =
                await this.transactionRepository.getTransactionById(id);
            return transactionData;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get transaction. \nError: ${error}`
            );
        }
    }

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const transactionList: Transaction[] =
                await this.transactionRepository.getAllTransactions();
            return transactionList;
        } catch (error: unknown) {
            throw new Error(
                `An error occurred while trying to get all transactions. \nError: ${error}`
            );
        }
    }
}

export default TransactionUsecase;
