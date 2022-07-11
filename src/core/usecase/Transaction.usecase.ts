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
        const transactionData: Transaction | undefined =
            await this.transactionRepository.getTransactionById(id);
        if (!transactionData) throw new Error('Transaction not exist');
        return transactionData;
    }

    async getAllTransactions(): Promise<Transaction[]> {
        const transactionList: Transaction[] =
            await this.transactionRepository.getAllTransactions();
        return transactionList;
    }
}

export default TransactionUsecase;
