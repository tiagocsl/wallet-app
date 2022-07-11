import Transaction from 'core/entity/Transaction.entity';
import TransactionRepository from 'core/repository/Transaction.repository';

class TransactionUsecase {
    transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    async makeTransaction(transaction: Transaction): Promise<Transaction> {
        const newTransaction: Transaction =
            await this.transactionRepository.makeTransaction(transaction);
        return newTransaction;
    }

    async getTransactionById(id: number): Promise<Transaction> {
        const transactionData: Transaction =
            await this.transactionRepository.getTransactionById(id);
        return transactionData;
    }

    async getAllTransactions(): Promise<Transaction[]> {
        const transactionList: Transaction[] =
            await this.transactionRepository.getAllTransactions();
        return transactionList;
    }
}

export default TransactionUsecase;
